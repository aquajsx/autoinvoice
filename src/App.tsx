import { useState } from 'react';
import {
  Cpu,
  FileText,
  ShieldCheck,
  Search,
  AlertTriangle,
  CheckCircle2,
  Database,
  RefreshCw,
  FileSearch,
  Paintbrush,
} from 'lucide-react';

const App = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);

  const auditScenarios = [
    {
      title: '完美匹配 (Perfect Match)',
      status: 'Success',
      color: 'green',
      desc: '供应商名称与金额均与历史台账一致。',
      action: '自动填充 Description，Excel 无高亮。',
      icon: <CheckCircle2 className="text-green-500" />,
    },
    {
      title: '金额预警 (Price Conflict)',
      status: 'Warning',
      color: 'red',
      desc: '识别到供应商，但本次金额与历史记录不符。',
      action: '金额单元格标红 (FILL_RED)，需人工核查价格变动。',
      icon: <AlertTriangle className="text-red-500" />,
    },
    {
      title: '身份纠正 (Vendor Correction)',
      status: 'Correction',
      color: 'yellow',
      desc: 'AI 识别名字模糊，但金额与历史某供应商完全一致。',
      action: '自动纠正 Vendor 名称，单元格标黄 (FILL_YELLOW)。',
      icon: <RefreshCw className="text-amber-500" />,
    },
    {
      title: '新供应商 (New Entry)',
      status: 'New',
      color: 'yellow',
      desc: '历史台账中完全没出现过该供应商或金额。',
      action: '标记为新发票，金额单元格标黄提醒注意。',
      icon: <FileSearch className="text-slate-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
            UPGRADED: RPA AUDIT VERSION
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            智能发票审计与比对系统
          </h1>
          <p className="text-slate-500">
            在 AI 提取基础上增加历史台账 (Reference) 双向校验与 Excel 自动渲染
          </p>
        </header>

        {/* Core Logic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Section 1: Data Sources */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 font-bold text-slate-700">
              <Database className="text-blue-500" /> 数据源加载
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Reference.xlsx</p>
                  <p className="text-xs text-slate-500">
                    加载历史 Vendor、金额与描述
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Hybrid Engine</p>
                  <p className="text-xs text-slate-500">
                    Llama4 + DeepSeek 执行基础提取
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2: Two-way Matching */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 font-bold text-slate-700">
              <Search className="text-purple-500" /> RPA 双向审计逻辑 (Audit
              Logic)
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
              <div className="w-full md:w-5/12 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                <p className="text-xs font-bold text-slate-400 mb-2">STEP 1</p>
                <p className="text-sm font-bold">按供应商名称比对</p>
                <p className="text-xs text-slate-500 mt-1">验证金额是否一致</p>
              </div>
              <RefreshCw className="text-slate-300 hidden md:block" />
              <div className="w-full md:w-5/12 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                <p className="text-xs font-bold text-slate-400 mb-2">
                  STEP 2 (若Step 1失败)
                </p>
                <p className="text-sm font-bold">按金额反向检索</p>
                <p className="text-xs text-slate-500 mt-1">
                  通过金额找回 Vendor 名称
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visualized Scenarios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Paintbrush className="text-pink-500" /> Excel 渲染场景模拟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditScenarios.map((s, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedScenario === idx
                    ? 'bg-white border-blue-500 shadow-md'
                    : 'bg-slate-50 border-transparent grayscale-[0.5]'
                }`}
                onClick={() => setSelectedScenario(idx)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-lg flex items-center gap-2">
                    {s.icon} {s.title}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-${s.color}-100 text-${s.color}-700`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{s.desc}</p>
                <div
                  className={`text-xs font-medium p-3 rounded-lg bg-${s.color}-50 text-${s.color}-800 border border-${s.color}-100`}
                >
                  处理动作: {s.action}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Excel Preview */}
        <section className="bg-slate-800 rounded-3xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} />
          </div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Database className="text-blue-400" /> 最终 Excel 单元格效果展示
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3 pr-4">Vendor</th>
                  <th className="pb-3 pr-4">Amount (No Tax)</th>
                  <th className="pb-3">Audit Result</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700/50">
                  <td className="py-4">Google Ireland</td>
                  <td className="py-4">1,200.00</td>
                  <td className="py-4 text-green-400">Perfect Match</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-4">Microsoft</td>
                  <td className="py-4 bg-red-600/80 text-white font-bold px-2 rounded">
                    5,400.00
                  </td>
                  <td className="py-4 text-red-400 flex items-center gap-1">
                    <AlertTriangle size={14} /> Amount Mismatch! (Ref: 5,000)
                  </td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-4 bg-yellow-500/80 text-slate-900 font-bold px-2 rounded">
                    AWS (Corrected)
                  </td>
                  <td className="py-4">3,200.00</td>
                  <td className="py-4 text-yellow-400">
                    Name Repaired via Amount
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-500 italic">
                    Unknown New Co.
                  </td>
                  <td className="py-4 bg-yellow-500/80 text-slate-900 font-bold px-2 rounded">
                    99.99
                  </td>
                  <td className="py-4 text-slate-400">New Vendor Detected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-12 text-center text-slate-400 text-xs">
          <p>
            逻辑更新: 引入 openpyxl.styles.PatternFill 进行物理底色填充 |
            双向历史检索加速审核流
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
