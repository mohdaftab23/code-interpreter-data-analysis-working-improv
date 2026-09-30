"""
Lightweight Pure-Python Matplotlib Pyplot Polyfill for E2B Sandbox
Collects plot state and emits structured __E2B_CHART_EXTRACTED__ metadata upon show()
"""
import json
import sys

_current_state = {
    "title": None,
    "xlabel": None,
    "ylabel": None,
    "type": "line",
    "elements": [],
}

def figure(*args, **kwargs):
    global _current_state
    _current_state = {
        "title": None,
        "xlabel": None,
        "ylabel": None,
        "type": "line",
        "elements": [],
    }

def title(label, *args, **kwargs):
    _current_state["title"] = str(label)

def xlabel(label, *args, **kwargs):
    _current_state["xlabel"] = str(label)

def ylabel(label, *args, **kwargs):
    _current_state["ylabel"] = str(label)

def grid(*args, **kwargs):
    pass

def legend(*args, **kwargs):
    pass

def bar(x, height, *args, **kwargs):
    _current_state["type"] = "bar"
    x_list = list(x)
    h_list = list(height)
    color = kwargs.get("color", "default")
    group = kwargs.get("label", "Series 1")

    for cat, val in zip(x_list, h_list):
        _current_state["elements"].append({
            "label": str(cat),
            "value": float(val),
            "group": group,
        })

def plot(*args, **kwargs):
    _current_state["type"] = "line"
    series_label = kwargs.get("label", "Series 1")

    if len(args) >= 2:
        x_pts = list(args[0])
        y_pts = list(args[1])
        pts = [[float(x) if isinstance(x, (int, float)) else str(x), float(y)] for x, y in zip(x_pts, y_pts)]
    elif len(args) == 1:
        y_pts = list(args[0])
        pts = [[i + 1, float(y)] for i, y in enumerate(y_pts)]
    else:
        pts = []

    _current_state["elements"].append({
        "label": series_label,
        "points": pts,
    })

def scatter(x, y, *args, **kwargs):
    _current_state["type"] = "scatter"
    series_label = kwargs.get("label", "Cluster 1")
    pts = [[float(x_val), float(y_val)] for x_val, y_val in zip(list(x), list(y))]
    _current_state["elements"].append({
        "label": series_label,
        "points": pts,
    })

def pie(x, labels=None, *args, **kwargs):
    _current_state["type"] = "pie"
    vals = [float(v) for v in list(x)]
    total = sum(vals) if sum(vals) else 1.0

    lbls = list(labels) if labels is not None else [f"Slice {i+1}" for i in range(len(vals))]
    for val, lbl in zip(vals, lbls):
        pct = round((val / total) * 100, 1)
        _current_state["elements"].append({
            "label": str(lbl),
            "value": val,
            "percentage": pct,
        })

def boxplot(x, labels=None, *args, **kwargs):
    _current_state["type"] = "box_and_whisker"
    groups_data = x if isinstance(x[0], (list, tuple)) else [x]
    lbls = list(labels) if labels is not None else [f"Group {i+1}" for i in range(len(groups_data))]

    for grp, lbl in zip(groups_data, lbls):
        sorted_vals = sorted([float(v) for v in grp])
        n = len(sorted_vals)
        if n == 0:
            continue
        min_v = sorted_vals[0]
        max_v = sorted_vals[-1]
        median_v = sorted_vals[n // 2]
        q1_v = sorted_vals[n // 4]
        q3_v = sorted_vals[(3 * n) // 4]

        _current_state["elements"].append({
            "label": str(lbl),
            "min": min_v,
            "first_quartile": q1_v,
            "median": median_v,
            "third_quartile": q3_v,
            "max": max_v,
            "outliers": [],
        })

def show(*args, **kwargs):
    payload = {
        "type": _current_state.get("type", "line"),
        "title": _current_state.get("title") or "Python Plot",
        "x_label": _current_state.get("xlabel") or "X Axis",
        "y_label": _current_state.get("ylabel") or "Y Axis",
        "elements": _current_state.get("elements", []),
    }
    # Emit chart payload for E2B extractor
    sys.stdout.write(f"\n__E2B_CHART_EXTRACTED__:{json.dumps(payload)}\n")
    sys.stdout.flush()
