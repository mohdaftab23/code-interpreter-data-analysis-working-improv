"""
Lightweight Pure-Python Pandas Polyfill for E2B Sandbox
"""
class Series(list):
    def __init__(self, data=None, index=None):
        super().__init__(data or [])
        self.index = index or list(range(len(self)))

    def mean(self):
        return sum(self) / len(self) if self else 0

    def sum(self):
        return sum(self)

    def describe(self):
        return f"count: {len(self)}, mean: {self.mean()}, sum: {self.sum()}"

class DataFrame:
    def __init__(self, data=None, columns=None, index=None):
        if isinstance(data, dict):
            self.columns = columns or list(data.keys())
            self.data = {k: list(v) for k, v in data.items()}
            self._len = len(next(iter(self.data.values()))) if self.data else 0
        else:
            self.columns = columns or []
            self.data = {}
            self._len = 0

    def __getitem__(self, key):
        if key in self.data:
            return Series(self.data[key])
        raise KeyError(key)

    def head(self, n=5):
        return self

    def describe(self):
        return {k: f"mean: {Series(v).mean()}" for k, v in self.data.items()}

    def mean(self):
        return {k: Series(v).mean() for k, v in self.data.items()}

def read_csv(filepath_or_buffer, *args, **kwargs):
    return DataFrame()
