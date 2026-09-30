import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
  BarChart3,
  Code2,
  AlertCircle,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Sparkles,
  PieChart as PieIcon,
  TrendingUp,
  Cpu,
  Wand2,
  Bug,
  CheckCircle2,
  ArrowRight,
  Download,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutDashboard,
  FileText,
  Presentation,
  Compass,
  Search,
  Filter,
  Palette,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers
} from 'lucide-react';

interface ExecutionLog {
  type: 'stdout' | 'stderr' | 'error';
  line: string;
  timestamp: number;
}

interface ExtractedChartData {
  type: 'line' | 'bar' | 'scatter' | 'pie' | 'box_and_whisker' | 'superchart' | 'unknown';
  title?: string;
  x_label?: string;
  y_label?: string;
  x_unit?: string;
  y_unit?: string;
  x_scale?: string;
  y_scale?: string;
  elements: any[];
}

interface ContextInfo {
  id: string;
  language: 'javascript' | 'python' | 'typescript';
  cwd: string;
  createdAt: number;
  status: 'ready' | 'busy' | 'restarting';
  executionCount: number;
}

interface RuntimeDecision {
  chosenLanguage: 'javascript' | 'python';
  confidence: number;
  reasoning: string;
  criteriaAnalysis: {
    dataTransformation: string;
    computationalPerformance: string;
    ecosystemFit: string;
  };
  recommendedLibraries: string[];
  generatedScript: string;
  suggestedPresentation?: string;
}

const TEMPLATES = [
  {
    name: 'Stock Price Time Series',
    lang: 'javascript',
    description: 'Line chart with moving averages and statistical metrics',
    code: `// E2B Code Interpreter - Line Chart & Time Series
console.log("Extracting high-frequency stock metrics...");

var prices = [142.5, 144.2, 143.8, 147.1, 146.5, 151.2, 153.8, 152.4, 156.9, 159.4, 162.1, 161.5];

// Calculate 3-period moving average
var movingAverage = prices.map(function(val, idx, arr) {
  if (idx < 2) return [idx + 1, val];
  var avg = (arr[idx] + arr[idx-1] + arr[idx-2]) / 3;
  return [idx + 1, Number(avg.toFixed(2))];
});

var rawPoints = prices.map(function(val, idx) { return [idx + 1, val]; });

console.log("Final Stock Price: $" + prices[prices.length - 1]);

plot.line({
  title: "TechCorp (TCRP) Daily Closing Price & 3-Day SMA",
  x_label: "Trading Day",
  y_label: "Closing Price [USD]",
  elements: [
    { label: "Price ($)", points: rawPoints },
    { label: "3-Day SMA", points: movingAverage }
  ]
});
`,
  },
  {
    name: 'Monthly Revenue Bar Chart',
    lang: 'javascript',
    description: 'Grouped bar chart with extracted revenue & cost data points',
    code: `// E2B Code Interpreter - Bar Chart & Data Analysis
console.log("Analyzing 2025 H1 Financial Performance...");

var monthlyData = [
  { label: "Jan", value: 45000, group: "Revenue" },
  { label: "Feb", value: 52000, group: "Revenue" },
  { label: "Mar", value: 61000, group: "Revenue" },
  { label: "Apr", value: 58000, group: "Revenue" },
  { label: "May", value: 74000, group: "Revenue" },
  { label: "Jun", value: 89000, group: "Revenue" },
  { label: "Jan", value: 31000, group: "Expenses" },
  { label: "Feb", value: 34000, group: "Expenses" },
  { label: "Mar", value: 39000, group: "Expenses" },
  { label: "Apr", value: 37000, group: "Expenses" },
  { label: "May", value: 43000, group: "Expenses" },
  { label: "Jun", value: 49000, group: "Expenses" }
];

var totalRevenue = monthlyData
  .filter(function(d) { return d.group === "Revenue"; })
  .reduce(function(sum, d) { return sum + d.value; }, 0);

console.log("Total H1 Revenue: $" + totalRevenue.toLocaleString());

plot.bar({
  title: "H1 2025 Revenue vs Operating Expenses",
  x_label: "Fiscal Month",
  y_label: "Amount (USD)",
  elements: monthlyData
});
`,
  },
  {
    name: 'Scatter Plot Correlation',
    lang: 'javascript',
    description: 'Multivariate scatter plot with customer engagement clusters',
    code: `// E2B Code Interpreter - Scatter Plot Extractor
console.log("Analyzing correlation between feature usage & account LTV...");

var enterpriseCohort = [
  [12, 1400], [18, 1950], [24, 2800], [30, 3600], [35, 4200], [42, 5100], [48, 5900]
];

var smbCohort = [
  [5, 450], [8, 700], [11, 950], [14, 1100], [17, 1300], [21, 1600], [25, 1850]
];

console.log("Enterprise Cohort sample points: " + enterpriseCohort.length);
console.log("SMB Cohort sample points: " + smbCohort.length);

plot.scatter({
  title: "Monthly Active Hours vs Customer LTV ($)",
  x_label: "Active Hours / Month",
  y_label: "Lifetime Value [USD]",
  elements: [
    { label: "Enterprise Tier", points: enterpriseCohort },
    { label: "SMB Tier", points: smbCohort }
  ]
});
`,
  },
  {
    name: 'Customer Segmentation Pie',
    lang: 'javascript',
    description: 'Pie chart with percentage distribution & slice angles',
    code: `// E2B Code Interpreter - Pie Chart Data Extractor
console.log("Segmenting user cohort by platform acquisition channel...");

var segments = [
  { label: "Organic Search", value: 4200 },
  { label: "Direct Referral", value: 2900 },
  { label: "Social Media Ads", value: 1850 },
  { label: "Partner Affiliates", value: 1200 },
  { label: "Email Campaigns", value: 850 }
];

var totalUsers = segments.reduce(function(sum, s) { return sum + s.value; }, 0);
console.log("Total Tracked Users: " + totalUsers.toLocaleString());

plot.pie({
  title: "Q2 Acquisition Channel Distribution",
  elements: segments.map(function(s) {
    return {
      label: s.label,
      value: s.value,
      percentage: Number(((s.value / totalUsers) * 100).toFixed(1))
    };
  })
});
`,
  },
  {
    name: 'Variance Box & Whisker Plot',
    lang: 'javascript',
    description: 'Statistical distribution with median, quartiles and outliers',
    code: `// E2B Code Interpreter - Box and Whisker Plot Extractor
console.log("Analyzing latency distribution across 3 microservices...");

plot.boxAndWhisker({
  title: "API Endpoint Latency Distribution",
  x_label: "Service Architecture",
  y_label: "Response Latency [ms]",
  elements: [
    {
      label: "Auth Gateway",
      min: 15,
      first_quartile: 24,
      median: 32,
      third_quartile: 46,
      max: 68,
      outliers: [11, 85, 94]
    },
    {
      label: "Database Service",
      min: 28,
      first_quartile: 42,
      median: 55,
      third_quartile: 71,
      max: 95,
      outliers: [120]
    },
    {
      label: "Edge CDN",
      min: 4,
      first_quartile: 8,
      median: 12,
      third_quartile: 18,
      max: 26,
      outliers: [35]
    }
  ]
});
`,
  },
  {
    name: 'Python Matplotlib Extractor',
    lang: 'python',
    description: 'Python Matplotlib figure analysis & automatic chart data extraction',
    code: `# E2B Code Interpreter - Python Matplotlib Extractor
import numpy as np
import matplotlib.pyplot as plt

print("Running Python data analysis kernel...")

categories = ['North America', 'Europe', 'Asia Pacific', 'Latin America']
sales_growth = [24.5, 18.2, 32.1, 14.8]

print(f"Top performing region: Asia Pacific (+{sales_growth[2]}%)")

# E2B automatically parses matplotlib figures & extracts structured data
plt.figure(figsize=(10, 6))
plt.title("Regional Sales Growth % (YoY)")
plt.xlabel("Sales Territories")
plt.ylabel("Growth Rate [%]")
plt.bar(categories, sales_growth, color='teal')
plt.grid(True)
plt.show()
`,
  },
];

const CONDITION_PRESETS = [
  {
    name: 'Matrix & Rolling Volatility',
    condition: 'Heavy statistical calculations with rolling window variance, NumPy arrays, and moving average smoothing',
  },
  {
    name: 'Event-Driven JSON Aggregation',
    condition: 'Fast in-memory JSON payload transformation, array filter/reduce mapping, and sub-millisecond execution',
  },
  {
    name: 'Multi-Group Variance & Boxplot',
    condition: 'Scientific distribution with interquartile ranges (IQR), medians, whiskers, and outlier detection',
  },
  {
    name: 'Customer Cohort LTV & Churn Ratios',
    condition: 'Segmenting customer accounts into proportional cohorts with percentage shares and interactive distribution',
  },
  {
    name: 'High-Frequency Stock Trend Analysis',
    condition: 'Time series financial data with daily closing prices, volume weights, and simple moving averages',
  },
];

export default function App() {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [selectedContextId, setSelectedContextId] = useState<string>('context-js-default');
  const [contexts, setContexts] = useState<ContextInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [chartData, setChartData] = useState<ExtractedChartData | null>(null);
  const [rawResult, setRawResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'presentation' | 'console' | 'raw'>('presentation');
  const [execDuration, setExecDuration] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentError, setCurrentError] = useState<string | null>(null);

  // Presentation Customization Options
  const [presentationMode, setPresentationMode] = useState<'chart' | 'table' | 'kpi' | 'report' | 'story'>('chart');
  const [colorPalette, setColorPalette] = useState<'indigo' | 'emerald' | 'sunset' | 'neon' | 'monochrome'>('indigo');
  const [barOrientation, setBarOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [showDataLabels, setShowDataLabels] = useState(true);
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [tableSearch, setTableSearch] = useState('');
  const [storySlide, setStorySlide] = useState(0);

  // Modals & Panels
  const [showContextModal, setShowContextModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  const [showDeciderModal, setShowDeciderModal] = useState(false);

  // Coding Agent State
  const [agentPrompt, setAgentPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState<string | null>(null);
  const [suggestedChartType, setSuggestedChartType] = useState<string | null>(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentStep, setAgentStep] = useState<'idle' | 'refining' | 'refined' | 'generating'>('idle');

  // Condition Decider State
  const [conditionInput, setConditionInput] = useState('');
  const [deciderLoading, setDeciderLoading] = useState(false);
  const [decisionResult, setDecisionResult] = useState<RuntimeDecision | null>(null);

  // Bug Fixer State
  const [fixLoading, setFixLoading] = useState(false);
  const [fixExplanation, setFixExplanation] = useState<string | null>(null);

  // Fetch contexts on mount
  const fetchContexts = async () => {
    try {
      const res = await fetch('/contexts');
      if (res.ok) {
        const data = await res.json();
        setContexts(data);
      }
    } catch (err) {
      console.error('Failed to load contexts', err);
    }
  };

  useEffect(() => {
    fetchContexts();
    handleExecute(TEMPLATES[0].code, 'javascript');
  }, []);

  const handleExecute = async (overrideCode?: string, overrideLang?: 'javascript' | 'python') => {
    const codeToRun = overrideCode !== undefined ? overrideCode : code;
    const langToRun = overrideLang !== undefined ? overrideLang : language;

    setLoading(true);
    setCurrentError(null);
    try {
      const res = await fetch('/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToRun,
          language: langToRun,
          context_id: selectedContextId,
        }),
      });

      const data = await res.json();
      setLogs(data.logs || []);
      setChartData(data.chart || null);
      setRawResult(data);
      setExecDuration(data.duration_ms || null);

      if (data.error) {
        setCurrentError(data.error);
        setActiveTab('console');
      } else {
        setCurrentError(null);
        if (data.chart) {
          setActiveTab('presentation');
        } else {
          setActiveTab('console');
        }
      }

      fetchContexts();
    } catch (err: any) {
      const errMsg = `Execution request failed: ${err.message}`;
      setCurrentError(errMsg);
      setLogs([{ type: 'stderr', line: errMsg, timestamp: Date.now() }]);
      setActiveTab('console');
    } finally {
      setLoading(false);
    }
  };

  // AI Agent: 1. Fine-tune Prompt
  const handleRefinePrompt = async () => {
    if (!agentPrompt.trim()) return;
    setAgentLoading(true);
    setAgentStep('refining');
    try {
      const res = await fetch('/api/agent/prompt-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: agentPrompt, language }),
      });
      const data = await res.json();
      setRefinedPrompt(data.refinedPrompt || agentPrompt);
      setSuggestedChartType(data.suggestedChartType || 'bar');
      setAgentStep('refined');
    } catch (err: any) {
      console.error(err);
      setRefinedPrompt(agentPrompt);
      setSuggestedChartType('bar');
      setAgentStep('refined');
    } finally {
      setAgentLoading(false);
    }
  };

  // AI Agent: 2. Generate Code from Refined Prompt
  const handleGenerateFromAgent = async () => {
    const finalPrompt = refinedPrompt || agentPrompt;
    if (!finalPrompt.trim()) return;

    setAgentLoading(true);
    setAgentStep('generating');
    try {
      const res = await fetch('/api/agent/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          language,
          chartType: suggestedChartType,
        }),
      });
      const data = await res.json();
      if (data.code) {
        setCode(data.code);
        setShowAgentPanel(false);
        setAgentStep('idle');
        setRefinedPrompt(null);
        handleExecute(data.code, language);
      }
    } catch (err: any) {
      console.error('Agent generation failed', err);
    } finally {
      setAgentLoading(false);
    }
  };

  // Condition & Runtime Decider
  const handleDecideRuntime = async (overrideCondition?: string) => {
    const condition = overrideCondition || conditionInput;
    if (!condition.trim()) return;

    setDeciderLoading(true);
    try {
      const res = await fetch('/api/agent/decide-runtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition }),
      });
      const data = await res.json();
      setDecisionResult(data);
    } catch (err) {
      console.error('Runtime decision failed', err);
    } finally {
      setDeciderLoading(false);
    }
  };

  const handleApplyDecision = () => {
    if (!decisionResult) return;
    const lang = decisionResult.chosenLanguage;
    setLanguage(lang);
    setSelectedContextId(lang === 'python' ? 'context-python-default' : 'context-js-default');
    setCode(decisionResult.generatedScript);
    setShowDeciderModal(false);
    handleExecute(decisionResult.generatedScript, lang);
  };

  // AI Bug Fixer
  const handleFixCodeWithAi = async () => {
    setFixLoading(true);
    try {
      const res = await fetch('/api/agent/fix-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          error: currentError || (logs.find(l => l.type === 'stderr')?.line) || 'Syntax or runtime error',
          logs,
          language,
        }),
      });
      const data = await res.json();
      if (data.fixedCode) {
        setCode(data.fixedCode);
        setFixExplanation(data.rootCause ? `${data.rootCause}. Fix: ${data.fixSummary}` : data.fixSummary);
        setCurrentError(null);
        await handleExecute(data.fixedCode, language);
      }
    } catch (err) {
      console.error('Auto fix error:', err);
    } finally {
      setFixLoading(false);
    }
  };

  const handleRestartContext = async (contextId: string) => {
    try {
      const res = await fetch(`/contexts/${contextId}/restart`, { method: 'POST' });
      if (res.ok) {
        fetchContexts();
        setCurrentError(null);
        setLogs(prev => [...prev, { type: 'stdout', line: `[Context ${contextId} restarted - scope cleared]`, timestamp: Date.now() }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyJson = () => {
    if (chartData) {
      navigator.clipboard.writeText(JSON.stringify(chartData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    if (chartData) {
      const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted_chart_${chartData.type}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Export Data to CSV
  const handleExportCsv = () => {
    if (!chartData || !chartData.elements) return;
    const rows: string[] = ['Label,Value,Group'];
    chartData.elements.forEach((item: any) => {
      const label = item.label || '';
      const val = item.value !== undefined ? item.value : (item.median !== undefined ? item.median : '');
      const group = item.group || '';
      rows.push(`"${label}",${val},"${group}"`);
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(chartData.title || 'extracted_data').replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Color Palette Definitions
  const paletteColors = useMemo(() => {
    switch (colorPalette) {
      case 'emerald':
        return {
          primary: '#10b981',
          secondary: '#14b8a6',
          accent: '#06b6d4',
          series: ['#10b981', '#14b8a6', '#06b6d4', '#84cc16'],
          barClasses: ['bg-emerald-500 hover:bg-emerald-400', 'bg-teal-500 hover:bg-teal-400', 'bg-cyan-500 hover:bg-cyan-400', 'bg-lime-500 hover:bg-lime-400'],
        };
      case 'sunset':
        return {
          primary: '#f97316',
          secondary: '#f43f5e',
          accent: '#fbbf24',
          series: ['#f97316', '#f43f5e', '#fbbf24', '#e11d48'],
          barClasses: ['bg-orange-500 hover:bg-orange-400', 'bg-rose-500 hover:bg-rose-400', 'bg-amber-500 hover:bg-amber-400', 'bg-red-500 hover:bg-red-400'],
        };
      case 'neon':
        return {
          primary: '#d946ef',
          secondary: '#06b6d4',
          accent: '#84cc16',
          series: ['#d946ef', '#06b6d4', '#84cc16', '#facc15'],
          barClasses: ['bg-fuchsia-500 hover:bg-fuchsia-400', 'bg-cyan-500 hover:bg-cyan-400', 'bg-lime-500 hover:bg-lime-400', 'bg-yellow-400 hover:bg-yellow-300'],
        };
      case 'monochrome':
        return {
          primary: '#94a3b8',
          secondary: '#cbd5e1',
          accent: '#f8fafc',
          series: ['#94a3b8', '#64748b', '#cbd5e1', '#e2e8f0'],
          barClasses: ['bg-slate-400 hover:bg-slate-300', 'bg-slate-500 hover:bg-slate-400', 'bg-slate-300 hover:bg-slate-200', 'bg-slate-600 hover:bg-slate-500'],
        };
      default: // indigo
        return {
          primary: '#6366f1',
          secondary: '#06b6d4',
          accent: '#10b981',
          series: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
          barClasses: ['bg-indigo-500 hover:bg-indigo-400', 'bg-cyan-500 hover:bg-cyan-400', 'bg-emerald-500 hover:bg-emerald-400', 'bg-amber-500 hover:bg-amber-400'],
        };
    }
  }, [colorPalette]);

  // Sorted and Filtered Elements
  const processedElements = useMemo(() => {
    if (!chartData || !Array.isArray(chartData.elements)) return [];
    let list = [...chartData.elements];

    // Filter by table search if applicable
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      list = list.filter((item: any) =>
        (item.label && String(item.label).toLowerCase().includes(q)) ||
        (item.group && String(item.group).toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortOrder === 'asc') {
      list.sort((a, b) => (Number(a.value || a.median || 0) - Number(b.value || b.median || 0)));
    } else if (sortOrder === 'desc') {
      list.sort((a, b) => (Number(b.value || b.median || 0) - Number(a.value || a.median || 0)));
    }

    return list;
  }, [chartData, sortOrder, tableSearch]);

  // Statistical aggregates for KPIs
  const stats = useMemo(() => {
    if (!chartData || !Array.isArray(chartData.elements) || chartData.elements.length === 0) {
      return null;
    }
    const elements = chartData.elements;
    let numericValues: number[] = [];

    if (chartData.type === 'bar' || chartData.type === 'pie') {
      numericValues = elements.map(e => Number(e.value)).filter(n => !isNaN(n));
    } else if (chartData.type === 'box_and_whisker') {
      numericValues = elements.map(e => Number(e.median)).filter(n => !isNaN(n));
    } else if (chartData.type === 'line' || chartData.type === 'scatter') {
      elements.forEach(s => {
        if (Array.isArray(s.points)) {
          s.points.forEach((p: any) => {
            const val = Number(p[1]);
            if (!isNaN(val)) numericValues.push(val);
          });
        }
      });
    }

    if (numericValues.length === 0) return null;

    const sum = numericValues.reduce((acc, v) => acc + v, 0);
    const mean = sum / numericValues.length;
    const sorted = [...numericValues].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const peakItem = elements.find((e: any) => Number(e.value || e.median) === max);

    return {
      sum,
      mean: Number(mean.toFixed(2)),
      median: Number(median.toFixed(2)),
      min,
      max,
      count: numericValues.length,
      peakLabel: peakItem?.label || 'Peak Element',
      range: max - min,
    };
  }, [chartData]);

  // Mode 1: Interactive Graphic Chart Renderer
  const renderChartGraphic = () => {
    if (!chartData) {
      return (
        <div className="h-72 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
          <BarChart3 className="w-10 h-10 mb-2 stroke-1 text-slate-600" />
          <p className="text-sm font-medium">No chart data extracted in this run</p>
          <p className="text-xs text-slate-600 mt-1">Use the Condition Decider, Coding Agent, or preset templates to execute</p>
        </div>
      );
    }

    // Bar Chart
    if (chartData.type === 'bar') {
      const elements = processedElements;
      const values = elements.map(e => Number(e.value) || 0);
      const maxValue = Math.max(...values, 100);
      const groups = Array.from(new Set(elements.map(e => e.group || 'Default')));

      if (barOrientation === 'horizontal') {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Bar Chart'}</h4>
              <span className="text-xs text-slate-500">{elements.length} data points (Horizontal)</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-3">
              {elements.map((item, idx) => {
                const widthPercent = Math.max(8, (Number(item.value) / maxValue) * 100);
                const colorClass = paletteColors.barClasses[idx % paletteColors.barClasses.length];
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-medium">{item.label}</span>
                      <span className="text-slate-400 font-bold">{item.value} {chartData.y_unit || ''}</span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-4 overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>0</span>
                <span>Scale: {maxValue} {chartData.y_unit || 'Units'}</span>
              </div>
            </div>
          </div>
        );
      }

      // Vertical Columns
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Bar Chart'}</h4>
            {groups.length > 1 && (
              <div className="flex items-center gap-3 text-xs">
                {groups.map((grp, gIdx) => (
                  <span key={grp} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: paletteColors.series[gIdx % paletteColors.series.length] }}></span>
                    <span className="text-slate-400">{grp}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <div className="h-64 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-l border-slate-700/60 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-500 w-full"></div>
                <div className="border-b border-dashed border-slate-500 w-full"></div>
                <div className="border-b border-dashed border-slate-500 w-full"></div>
              </div>

              {elements.map((item, idx) => {
                const heightPercent = Math.max(8, (Number(item.value) / maxValue) * 100);
                const colorClass = paletteColors.barClasses[idx % paletteColors.barClasses.length];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    <div
                      className={`w-full max-w-[44px] rounded-t-md transition-all duration-300 ${colorClass} relative`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      {showDataLabels && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-300 font-bold">
                          {item.value}
                        </span>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 text-slate-200 text-xs px-2 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap z-10 pointer-events-none">
                        {item.group ? `${item.group}: ` : ''}{item.value} {chartData.y_unit || ''}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate max-w-full mt-2 font-mono">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
              <span>{chartData.x_label || 'Categories'}</span>
              <span>{chartData.y_label || 'Values'} ({chartData.y_unit || 'Units'})</span>
            </div>
          </div>
        </div>
      );
    }

    // Line Chart
    if (chartData.type === 'line') {
      const elements = processedElements;
      const allPoints: [number, number][] = [];
      elements.forEach(series => {
        if (Array.isArray(series.points)) {
          series.points.forEach((p: any) => allPoints.push([Number(p[0]), Number(p[1])]));
        }
      });

      const xVals = allPoints.map(p => p[0]);
      const yVals = allPoints.map(p => p[1]);
      const minX = Math.min(...(xVals.length ? xVals : [0]));
      const maxX = Math.max(...(xVals.length ? xVals : [10]));
      const minY = Math.min(...(yVals.length ? yVals : [0]));
      const maxY = Math.max(...(yVals.length ? yVals : [100]));
      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Line Chart'}</h4>
            <div className="flex items-center gap-3 text-xs">
              {elements.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded" style={{ backgroundColor: paletteColors.series[idx % paletteColors.series.length] }}></span>
                  <span className="text-slate-400">{s.label || `Series ${idx + 1}`}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <div className="h-64 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />

                {elements.map((series, sIdx) => {
                  const pts: [number, number][] = series.points || [];
                  if (pts.length < 2) return null;
                  const color = paletteColors.series[sIdx % paletteColors.series.length];

                  const pathStr = pts
                    .map((p, pIdx) => {
                      const x = ((p[0] - minX) / rangeX) * 480 + 10;
                      const y = 190 - ((p[1] - minY) / rangeY) * 170;
                      return `${pIdx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');

                  return (
                    <g key={sIdx}>
                      <path d={pathStr} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map((p, pIdx) => {
                        const x = ((p[0] - minX) / rangeX) * 480 + 10;
                        const y = 190 - ((p[1] - minY) / rangeY) * 170;
                        return (
                          <g key={pIdx}>
                            <circle cx={x} cy={y} r="4" fill={color} stroke="#0f172a" strokeWidth="2" />
                            {showDataLabels && (
                              <text x={x} y={y - 8} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                                {p[1]}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
              <span>{chartData.x_label || 'Time/Index'}</span>
              <span>{chartData.y_label || 'Value'} {chartData.y_unit ? `(${chartData.y_unit})` : ''}</span>
            </div>
          </div>
        </div>
      );
    }

    // Pie Chart
    if (chartData.type === 'pie') {
      const elements = processedElements;
      const total = elements.reduce((acc, el) => acc + (Number(el.value) || 0), 0) || 1;
      let cumulativePercent = 0;

      return (
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Pie Chart'}</h4>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <svg viewBox="0 0 32 32" className="w-52 h-52 -rotate-90">
                {elements.map((slice, idx) => {
                  const val = Number(slice.value) || 0;
                  const percent = (val / total) * 100;
                  const strokeDasharray = `${percent} ${100 - percent}`;
                  const strokeDashoffset = -cumulativePercent;
                  cumulativePercent += percent;

                  return (
                    <circle
                      key={idx}
                      r="16"
                      cx="16"
                      cy="16"
                      fill="transparent"
                      stroke={paletteColors.series[idx % paletteColors.series.length]}
                      strokeWidth="32"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all hover:opacity-85"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="space-y-3">
              {elements.map((item, idx) => {
                const percent = (((Number(item.value) || 0) / total) * 100).toFixed(1);
                return (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-800/40 border border-slate-700/40 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: paletteColors.series[idx % paletteColors.series.length] }}></span>
                      <span className="font-medium text-slate-300">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-400">{item.value}</span>
                      <span className="font-semibold text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded">{percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Box and Whisker Plot
    if (chartData.type === 'box_and_whisker') {
      const elements = processedElements;
      return (
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Box & Whisker Plot'}</h4>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {elements.map((box, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700/60 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                    <span className="font-medium text-slate-200 text-sm">{box.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: `${paletteColors.primary}25`, color: paletteColors.primary }}>
                      Median: {box.median}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                    <div>Min: <span className="font-mono text-slate-200">{box.min}</span></div>
                    <div>Max: <span className="font-mono text-slate-200">{box.max}</span></div>
                    <div>Q1 (25%): <span className="font-mono text-slate-200">{box.first_quartile}</span></div>
                    <div>Q3 (75%): <span className="font-mono text-slate-200">{box.third_quartile}</span></div>
                  </div>
                  {Array.isArray(box.outliers) && box.outliers.length > 0 && (
                    <div className="pt-2 text-xs text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Outliers: {box.outliers.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Scatter Plot
    if (chartData.type === 'scatter') {
      const elements = processedElements;
      const allPoints: [number, number][] = [];
      elements.forEach(series => {
        if (Array.isArray(series.points)) {
          series.points.forEach((p: any) => allPoints.push([Number(p[0]), Number(p[1])]));
        }
      });

      const xVals = allPoints.map(p => p[0]);
      const yVals = allPoints.map(p => p[1]);
      const minX = Math.min(...(xVals.length ? xVals : [0]));
      const maxX = Math.max(...(xVals.length ? xVals : [10]));
      const minY = Math.min(...(yVals.length ? yVals : [0]));
      const maxY = Math.max(...(yVals.length ? yVals : [100]));
      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-slate-200">{chartData.title || 'Scatter Plot'}</h4>
            <div className="flex items-center gap-3 text-xs">
              {elements.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: paletteColors.series[idx % paletteColors.series.length] }}></span>
                  <span className="text-slate-400">{s.label || `Cluster ${idx + 1}`}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <div className="h-64 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                <line x1="10" y1="40" x2="490" y2="40" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="10" y1="100" x2="490" y2="100" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="10" y1="160" x2="490" y2="160" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />

                {elements.map((series, sIdx) => {
                  const pts: [number, number][] = series.points || [];
                  const color = paletteColors.series[sIdx % paletteColors.series.length];

                  return (
                    <g key={sIdx}>
                      {pts.map((p, pIdx) => {
                        const cx = ((p[0] - minX) / rangeX) * 460 + 20;
                        const cy = 180 - ((p[1] - minY) / rangeY) * 150;
                        return (
                          <circle
                            key={pIdx}
                            cx={cx}
                            cy={cy}
                            r="5"
                            fill={color}
                            fillOpacity="0.85"
                            stroke="#0f172a"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Mode 2: Rich Data Matrix Table
  const renderDataTable = () => {
    if (!chartData || !Array.isArray(chartData.elements)) {
      return <p className="text-slate-500 text-xs p-6 text-center">No tabular elements to display</p>;
    }

    const elements = processedElements;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Structured Data Matrix</h4>
            <p className="text-xs text-slate-400">Extracted schema features and records</p>
          </div>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Search records by label or cohort group..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
              <tr>
                <th className="p-3">Index</th>
                <th className="p-3">Record Label</th>
                <th className="p-3">Extracted Value</th>
                <th className="p-3">Classification Group</th>
                <th className="p-3 text-right">Relative Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {elements.map((item: any, idx: number) => {
                const val = item.value !== undefined ? item.value : (item.median !== undefined ? item.median : 'N/A');
                const isMax = stats && val === stats.max;
                const isMin = stats && val === stats.min;

                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 text-slate-500">#{idx + 1}</td>
                    <td className="p-3 text-slate-200 font-semibold">{item.label || `Point ${idx + 1}`}</td>
                    <td className="p-3 text-slate-100 font-bold">
                      {val} {chartData.y_unit || ''}
                    </td>
                    <td className="p-3 text-slate-400">{item.group || 'Default'}</td>
                    <td className="p-3 text-right">
                      {isMax ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                          Max Peak
                        </span>
                      ) : isMin ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px]">
                          Minimum
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Normal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Mode 3: Executive KPI & Metrics Dashboard
  const renderKpiDashboard = () => {
    if (!stats) {
      return <p className="text-slate-500 text-xs p-6 text-center">Run code with data points to compute KPIs</p>;
    }

    return (
      <div className="space-y-5">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Executive KPI Dashboard</h4>
          <p className="text-xs text-slate-400">Statistical aggregation and high-level distribution telemetry</p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Aggregated</span>
            <div className="text-xl font-bold text-indigo-400 font-mono">
              {stats.sum.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">Across {stats.count} recorded points</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mean Average</span>
            <div className="text-xl font-bold text-emerald-400 font-mono">
              {stats.mean.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">Normalized expected value</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Peak Value</span>
            <div className="text-xl font-bold text-amber-400 font-mono">
              {stats.max.toLocaleString()}
            </div>
            <span className="text-[10px] text-amber-500/80 truncate block">{stats.peakLabel}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Variance Spread</span>
            <div className="text-xl font-bold text-cyan-400 font-mono">
              {stats.range.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">Min {stats.min} to Max {stats.max}</span>
          </div>
        </div>

        {/* Analytical Takeaway Cards */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Key Analytical Takeaways
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-semibold block">Distribution Skew</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Median is <span className="font-mono text-emerald-400">{stats.median}</span> versus mean <span className="font-mono text-emerald-400">{stats.mean}</span>, indicating a balanced dataset with minimal extreme skew.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-semibold block">Top Performing Contributor</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <span className="font-semibold text-amber-300">{stats.peakLabel}</span> represents the maximum peak with <span className="font-mono text-amber-400">{stats.max} {chartData?.y_unit || ''}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mode 4: Executive Narrative Report
  const renderExecutiveReport = () => {
    if (!chartData) {
      return <p className="text-slate-500 text-xs p-6 text-center">Execute code to compile report</p>;
    }

    const reportMarkdown = `# ${chartData.title || 'Data Analysis Report'}
Generated on: ${new Date().toLocaleDateString()} via E2B Code Interpreter

## 1. Executive Summary
This report analyzes extracted telemetry for "${chartData.title}". Total elements evaluated: ${chartData.elements?.length || 0}. 

## 2. Quantitative Key Indicators
- Chart Type: ${chartData.type}
- Primary Dimension (X-Axis): ${chartData.x_label || 'Default Dimension'} ${chartData.x_unit ? `(${chartData.x_unit})` : ''}
- Metric Dimension (Y-Axis): ${chartData.y_label || 'Values'} ${chartData.y_unit ? `(${chartData.y_unit})` : ''}
${stats ? `- Total Aggregation: ${stats.sum}\n- Mean Average: ${stats.mean}\n- Peak Value: ${stats.max} (${stats.peakLabel})\n- Minimum: ${stats.min}` : ''}

## 3. Sandboxed Execution Methodology
Executed in isolated Node V8 / Python environment with automatic chart feature extraction.
`;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Executive Narrative Report</h4>
            <p className="text-xs text-slate-400">Formatted documentation ready for executive review</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(reportMarkdown);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow transition"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copied Report!' : 'Copy Markdown Report'}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-300 space-y-4 leading-relaxed whitespace-pre-wrap">
          {reportMarkdown}
        </div>
      </div>
    );
  };

  // Mode 5: Interactive Story Presentation Deck
  const renderStoryDeck = () => {
    if (!chartData) {
      return <p className="text-slate-500 text-xs p-6 text-center">Execute code to generate presentation deck</p>;
    }

    const slides = [
      {
        title: 'Executive Briefing & Strategic Scope',
        tag: 'Slide 1 of 3: Problem Statement',
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100">{chartData.title || 'Analytical Investigation'}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This analysis evaluates key performance patterns and distributional characteristics across {chartData.elements?.length || 0} extracted dimensions.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Primary Metric</span>
                <span className="text-sm font-semibold text-indigo-400">{chartData.y_label || 'Value Output'}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Dimension Category</span>
                <span className="text-sm font-semibold text-emerald-400">{chartData.x_label || 'Categories'}</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Empirical Evidence & Extracted Visual Findings',
        tag: 'Slide 2 of 3: Data Evidence',
        content: (
          <div className="space-y-4">
            <div className="h-44 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60 p-2">
              {renderChartGraphic()}
            </div>
            {stats && (
              <p className="text-xs text-slate-300 font-mono">
                Key takeaway: Mean performance tracks at <strong className="text-emerald-400">{stats.mean}</strong>, with peak output observed at <strong className="text-amber-400">{stats.max}</strong>.
              </p>
            )}
          </div>
        ),
      },
      {
        title: 'Strategic Synthesis & Next Actions',
        tag: 'Slide 3 of 3: Actionable Recommendations',
        content: (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
              <strong>1. Resource Allocation:</strong> Prioritize high-yield cohorts matching the peak threshold ({stats?.max || 'top'} units).
            </div>
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-300">
              <strong>2. Volatility Management:</strong> Normalize variance spread across baseline tiers.
            </div>
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
              <strong>3. Continuous Telemetry:</strong> Deploy recurring E2B sandbox interpreters to track period-over-period drift.
            </div>
          </div>
        ),
      },
    ];

    const currentSlide = slides[storySlide];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Presentation Deck Mode</h4>
            <span className="text-xs text-indigo-400 font-mono">{currentSlide.tag}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStorySlide(s => Math.max(0, s - 1))}
              disabled={storySlide === 0}
              className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-200 hover:bg-slate-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400">{storySlide + 1} / {slides.length}</span>
            <button
              onClick={() => setStorySlide(s => Math.min(slides.length - 1, s + 1))}
              disabled={storySlide === slides.length - 1}
              className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-200 hover:bg-slate-700 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl min-h-[280px] flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
              {currentSlide.title}
            </h3>
            {currentSlide.content}
          </div>

          <div className="flex justify-center gap-2 pt-4 border-t border-slate-800/80">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStorySlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  storySlide === i ? 'bg-indigo-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const activeContext = contexts.find(c => c.id === selectedContextId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-base tracking-tight">E2B Code Interpreter</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Data Extractor &amp; Decider
                </span>
              </div>
              <p className="text-xs text-slate-400">Condition-driven runtime selector &amp; multi-format presentation engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Condition Runtime Decider Button */}
            <button
              onClick={() => setShowDeciderModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md shadow-emerald-500/20 transition"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Condition Decider</span>
            </button>

            {/* AI Coding Agent Button */}
            <button
              onClick={() => setShowAgentPanel(!showAgentPanel)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-md shadow-indigo-500/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>AI Agent</span>
            </button>

            {/* Context Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">Context:</span>
              <span className="font-mono text-slate-200">{activeContext?.language || language}</span>
            </div>

            <button
              onClick={() => setShowContextModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
            >
              <Cpu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* AI Coding Agent Drawer */}
      {showAgentPanel && (
        <div className="bg-slate-900 border-b border-indigo-500/30 p-4 transition-all animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-100">
                  AI Coding Agent — Prompt Fine-tuning &amp; Code Generation
                </h3>
              </div>
              <button
                onClick={() => setShowAgentPanel(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRefinePrompt();
                }}
                placeholder="Describe your data analysis goal (e.g. Compare monthly revenue vs expenses across Q1-Q4 with profit margins)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefinePrompt}
                  disabled={agentLoading || !agentPrompt.trim()}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-medium text-white rounded-lg flex items-center gap-1.5 transition"
                >
                  {agentLoading && agentStep === 'refining' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  Fine-tune Prompt
                </button>

                <button
                  onClick={handleGenerateFromAgent}
                  disabled={agentLoading || (!agentPrompt.trim() && !refinedPrompt)}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-xs font-medium text-white rounded-lg flex items-center gap-1.5 transition"
                >
                  {agentLoading && agentStep === 'generating' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  Generate &amp; Run
                </button>
              </div>
            </div>

            {refinedPrompt && (
              <div className="bg-slate-950/80 border border-indigo-500/40 rounded-lg p-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-indigo-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Fine-tuned Specification:
                  </span>
                  {suggestedChartType && (
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase text-[10px]">
                      Recommended: {suggestedChartType}
                    </span>
                  )}
                </div>
                <p className="text-slate-300">{refinedPrompt}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleGenerateFromAgent}
                    disabled={agentLoading}
                    className="flex items-center gap-1 text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md font-medium"
                  >
                    <span>Write Code &amp; Execute</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Code Editor & Presets (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
            </span>
            {TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCode(tmpl.code);
                  setLanguage(tmpl.lang as any);
                  handleExecute(tmpl.code, tmpl.lang as any);
                }}
                className={`text-xs px-2.5 py-1 rounded-md transition whitespace-nowrap border shrink-0 ${
                  code === tmpl.code
                    ? 'bg-indigo-600/30 border-indigo-500/60 text-indigo-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>

          {/* AI Bug Fix Banner (Visible when error detected) */}
          {currentError && (
            <div className="bg-rose-950/40 border border-rose-500/50 rounded-xl p-3.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-rose-200 block">Execution Error Detected:</span>
                  <span className="text-rose-300 font-mono text-[11px] break-all">{currentError}</span>
                </div>
              </div>

              <button
                onClick={handleFixCodeWithAi}
                disabled={fixLoading}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-medium rounded-lg shadow flex items-center gap-1.5 shrink-0 transition"
              >
                {fixLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Bug className="w-3.5 h-3.5" />
                )}
                <span>Fix with AI Agent</span>
              </button>
            </div>
          )}

          {/* Fix Explanation Banner */}
          {fixExplanation && !currentError && (
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3 text-xs flex items-center justify-between text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Bug Fixed:</strong> {fixExplanation}</span>
              </div>
              <button
                onClick={() => setFixExplanation(null)}
                className="text-slate-400 hover:text-slate-200 ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Code Editor Container */}
          <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* Editor Toolbar */}
            <div className="bg-slate-950/70 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  Kernel Cell
                </span>

                <select
                  value={language}
                  onChange={(e) => {
                    const newLang = e.target.value as any;
                    setLanguage(newLang);
                    setSelectedContextId(newLang === 'python' ? 'context-python-default' : 'context-js-default');
                  }}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="javascript">JavaScript (Node VM)</option>
                  <option value="python">Python (Data Extractor)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDeciderModal(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-1 transition"
                  title="Describe conditions and let the engine choose Python or JavaScript"
                >
                  <Compass className="w-3 h-3" />
                  <span>Condition Decider</span>
                </button>

                <button
                  onClick={handleFixCodeWithAi}
                  disabled={fixLoading}
                  className="text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-1 transition"
                  title="Fix bugs or optimize code with AI"
                >
                  <Bug className="w-3 h-3" />
                  <span>AI Fix</span>
                </button>

                <button
                  onClick={() => handleRestartContext(selectedContextId)}
                  className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition flex items-center gap-1"
                  title="Clear variables & restart context"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Scope</span>
                </button>

                <button
                  onClick={() => handleExecute()}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg shadow transition"
                >
                  {loading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>Run Code</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="relative flex-1 min-h-[380px] bg-slate-950/90 font-mono text-sm">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleExecute();
                  }
                }}
                placeholder="// Write data analysis code or ask the AI Coding Agent..."
                className="w-full h-full min-h-[380px] p-4 bg-transparent text-slate-200 outline-none resize-none font-mono text-xs leading-relaxed selection:bg-indigo-500/30"
                spellCheck={false}
              />
            </div>

            {/* Editor Footer */}
            <div className="bg-slate-950/80 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                E2B Isolated Sandbox ({language.toUpperCase()})
              </span>
              {execDuration !== null && (
                <span className="font-mono text-slate-400">Execution time: {execDuration}ms</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-format Presentation & Outputs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Output Card */}
          <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* Top Navigation: Presentation vs Console vs Raw JSON */}
            <div className="bg-slate-950/70 border-b border-slate-800 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('presentation')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    activeTab === 'presentation'
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Presentation Views
                  {chartData && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
                </button>

                <button
                  onClick={() => setActiveTab('console')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    activeTab === 'console'
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Console Logs
                  {logs.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">
                      {logs.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('raw')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    activeTab === 'raw'
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Extracted JSON
                </button>
              </div>

              {chartData && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800 border border-slate-700 transition"
                    title="Copy Extracted Chart JSON"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="p-1 text-slate-400 hover:text-slate-200 rounded bg-slate-800 border border-slate-700 transition"
                    title="Download JSON"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Sub-bar for Multi-Presentation Modes (When in presentation tab) */}
            {activeTab === 'presentation' && (
              <div className="bg-slate-950/40 border-b border-slate-800/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* 5 Presentation Modes */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPresentationMode('chart')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                      presentationMode === 'chart'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Graphic
                  </button>

                  <button
                    onClick={() => setPresentationMode('table')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                      presentationMode === 'table'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Matrix Table
                  </button>

                  <button
                    onClick={() => setPresentationMode('kpi')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                      presentationMode === 'kpi'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LayoutDashboard className="w-3 h-3" />
                    KPIs
                  </button>

                  <button
                    onClick={() => setPresentationMode('report')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                      presentationMode === 'report'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    Narrative
                  </button>

                  <button
                    onClick={() => setPresentationMode('story')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                      presentationMode === 'story'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Presentation className="w-3 h-3" />
                    Deck
                  </button>
                </div>

                {/* Customization Dropdowns & Toggles */}
                <div className="flex items-center gap-2">
                  {/* Palette Selector */}
                  <select
                    value={colorPalette}
                    onChange={(e) => setColorPalette(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-[11px] rounded px-1.5 py-0.5 outline-none font-mono"
                    title="Choose color theme"
                  >
                    <option value="indigo">Indigo Modern</option>
                    <option value="emerald">Emerald Forest</option>
                    <option value="sunset">Sunset Glow</option>
                    <option value="neon">Neon Cyber</option>
                    <option value="monochrome">Monochrome Pro</option>
                  </select>

                  {/* Orientation Toggle for Bars */}
                  {chartData?.type === 'bar' && presentationMode === 'chart' && (
                    <button
                      onClick={() => setBarOrientation(o => o === 'vertical' ? 'horizontal' : 'vertical')}
                      className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300 font-mono"
                      title="Toggle vertical columns vs horizontal bars"
                    >
                      {barOrientation === 'vertical' ? 'Vertical' : 'Horizontal'}
                    </button>
                  )}

                  {/* Sort Order Toggle */}
                  <button
                    onClick={() => setSortOrder(s => s === 'default' ? 'desc' : (s === 'desc' ? 'asc' : 'default'))}
                    className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1 font-mono"
                    title="Sort elements by magnitude"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>{sortOrder === 'default' ? 'Sort' : sortOrder.toUpperCase()}</span>
                  </button>

                  {/* Labels Toggle */}
                  <button
                    onClick={() => setShowDataLabels(l => !l)}
                    className={`p-1 rounded border text-[11px] transition ${
                      showDataLabels
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                    title="Toggle data labels"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Output Content Area */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[580px]">
              {activeTab === 'presentation' && (
                <div className="space-y-4">
                  {presentationMode === 'chart' && renderChartGraphic()}
                  {presentationMode === 'table' && renderDataTable()}
                  {presentationMode === 'kpi' && renderKpiDashboard()}
                  {presentationMode === 'report' && renderExecutiveReport()}
                  {presentationMode === 'story' && renderStoryDeck()}
                </div>
              )}

              {activeTab === 'console' && (
                <div className="font-mono text-xs space-y-1.5 bg-slate-950 p-4 rounded-lg border border-slate-800 min-h-[300px]">
                  {logs.length === 0 ? (
                    <p className="text-slate-600">No output logs yet. Click "Run Code" to view execution stream.</p>
                  ) : (
                    logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-slate-600 select-none">&gt;</span>
                        <span
                          className={`break-all ${
                            log.type === 'stderr' || log.type === 'error'
                              ? 'text-rose-400'
                              : log.line.startsWith('[Chart') || log.line.startsWith('[E2B')
                              ? 'text-cyan-400 font-semibold'
                              : 'text-emerald-300'
                          }`}
                        >
                          {log.line}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'raw' && (
                <pre className="font-mono text-[11px] p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                  {JSON.stringify(rawResult || { message: 'Run code to see execution payload' }, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Smart Condition & Runtime Decider Modal */}
      {showDeciderModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-base font-semibold text-slate-100">
                    Smart Condition &amp; Runtime Decider
                  </h3>
                  <p className="text-xs text-slate-400">Describe your computational conditions and constraints to auto-select JavaScript or Python</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeciderModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Quick condition presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Example Condition Scenarios:</span>
              <div className="flex flex-wrap gap-1.5">
                {CONDITION_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setConditionInput(preset.condition);
                      handleDecideRuntime(preset.condition);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Your Scenario / Requirements:</label>
              <textarea
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
                placeholder="e.g. I need to calculate matrix covariances and plot rolling moving averages with standard deviation..."
                className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleDecideRuntime()}
                disabled={deciderLoading || !conditionInput.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {deciderLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5" />
                )}
                Evaluate Condition &amp; Choose Runtime
              </button>
            </div>

            {/* Decision Output Card */}
            {decisionResult && (
              <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Recommended Runtime:</span>
                    <span className={`font-mono font-bold text-sm uppercase px-2 py-0.5 rounded ${
                      decisionResult.chosenLanguage === 'python'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {decisionResult.chosenLanguage}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-mono font-semibold">
                    {decisionResult.confidence}% Match
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {decisionResult.reasoning}
                </p>

                <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px]">
                  <div><strong className="text-slate-400">Data Transformation:</strong> {decisionResult.criteriaAnalysis.dataTransformation}</div>
                  <div><strong className="text-slate-400">Performance Rationale:</strong> {decisionResult.criteriaAnalysis.computationalPerformance}</div>
                  <div><strong className="text-slate-400">Ecosystem Fit:</strong> {decisionResult.criteriaAnalysis.ecosystemFit}</div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Libraries: {decisionResult.recommendedLibraries.join(', ')}
                  </span>
                  <button
                    onClick={handleApplyDecision}
                    className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <span>Apply &amp; Run Script</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contexts Modal */}
      {showContextModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Active Sandbox Contexts
              </h3>
              <button
                onClick={() => setShowContextModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {contexts.map((ctx) => (
                <div
                  key={ctx.id}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    selectedContextId === ctx.id
                      ? 'bg-indigo-950/30 border-indigo-500/50'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-semibold text-slate-200">{ctx.id}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 text-[10px] uppercase">
                        {ctx.language}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1">
                      CWD: {ctx.cwd} | Executions: {ctx.executionCount}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedContextId(ctx.id);
                        setLanguage(ctx.language as any);
                      }}
                      className={`px-2 py-1 rounded text-xs transition ${
                        selectedContextId === ctx.id
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {selectedContextId === ctx.id ? 'Active' : 'Select'}
                    </button>
                    <button
                      onClick={() => handleRestartContext(ctx.id)}
                      title="Clear scope and restart context"
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-end">
              <button
                onClick={() => setShowContextModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
