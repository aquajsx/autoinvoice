import React, { useState } from 'react';
import { 
  Cpu, 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Database,
  RefreshCw,
  FileSearch,
  Paintbrush,
  Network,
  Zap,
  Eye,
  Languages,
  ArrowRight
} from 'lucide-react';

const App = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);

  // AI 路由策略定义
  const routingSteps = [
    {
      id: "Route A",
      name: "双引擎文本模式",
      models: "Llama 4 + DeepSeek R1",
      desc: "首选路径：若检测到有效原生文本，双模型交叉提取，互相补足短板。",
      trigger: "条件: 文本长度 > 50字符",
      icon: <Zap className="w-5 h-5" />,
      color: "blue"
    },
    {
      id: "Route B",
      name: "英文视觉兜底",
      models: "Llama 3.2 Vision (90b)",
      desc: "次选路径：文本破碎或缺失时，转为图片，由 90b 视觉大模型直接“看图”。",
      trigger: "条件: Route A 失败或无文本",
      icon: <Eye className="w-5 h-5" />,
      color: "indigo"
    },
    {
      id: "Route C",
      name: "中文视觉特种兵",
      models: "MiniCPM-V",
      desc: "终极防线：处理复杂中文排版，或当西方模型命中 CMI 黑名单时的紧急接管。",
      trigger: "条件: Route B 失败或命中黑名单",
      icon: <Languages className="w-5 h-5" />,
      color: "red"
    }
  ];

  // RPA 审计场景定义
  const auditScenarios = [
    {
      title: "主名/别名精准匹配 (Name/Alias Match)",
      status: "Success",
      color: "green",
      desc: "AI提取名称与台账主名或多个别名(;)之一匹配，且金额一致。",
      action: "统一规范为主名称，自动填充 Description，无高亮。",
      icon: <CheckCircle2 className="text-green-500" />
    },
    {
      title: "金额预警 (Price Conflict)",
      status: "Warning",
      color: "red",
      desc: "识别到供应商，但本次金额与历史记录不符。",
      action: "金额单元格标红 (FILL_RED)，需人工核查价格变动。",
      icon: <AlertTriangle className="text-red-500" />
    },
    {
      title: "身份纠正 (Vendor Correction)",
      status: "Correction",
      color: "yellow",
      desc: "AI 识别名字模糊，但金额与历史某供应商完全一致。",
      action: "自动纠正 Vendor 名称，单元格标黄 (FILL_YELLOW)。",
      icon: <RefreshCw className="text-amber-500" />
    },
    {
      title: "新供应商 (New Entry)",
      status: "New",
      color: "yellow",
      desc: "历史台账中完全没出现过该供应商或金额。",
      action: "标记为新发票，金额单元格标黄提醒注意。",
      icon: <FileSearch className="text-slate-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4 border border-blue-200">
            HYBRID AI ROUTING + RPA AUDIT 
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">智能发票信息提取与核查校验工具</h1>
          <p className="text-slate-500 text-sm md:text-base">
            融合 4 大 LLM 模型的动态 Fallback 路由，外加多别名(;)双向校验与自动排错的高级管线
          </p>
        </header>

        {/* Section 1: AI Models & Dynamic Routing */}
        <section className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6 font-bold text-slate-800 text-lg">
            <Network className="text-blue-500" /> AI 模型矩阵与动态路由 (Dynamic Fallback Routing)
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
            {routingSteps.map((route, idx) => (
              <React.Fragment key={idx}>
                <div className={`flex-1 w-full bg-slate-50 rounded-xl p-5 border-t-4 border-${route.color}-500 shadow-sm relative overflow-hidden`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-black uppercase tracking-wider text-${route.color}-600 bg-${route.color}-100 px-2 py-1 rounded`}>
                      {route.id}
                    </span>
                    <div className={`p-1.5 bg-${route.color}-100 text-${route.color}-600 rounded-lg`}>
                      {route.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{route.name}</h3>
                  <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-1">
                    <Cpu size={12}/> {route.models}
                  </div>
                  <p className="text-xs text-slate-600 mb-4 h-10 leading-relaxed">{route.desc}</p>
                  <div className="text-[10px] bg-white border border-slate-200 px-2 py-1.5 rounded text-slate-500 font-medium border-dashed">
                    {route.trigger}
                  </div>
                </div>
                {idx < routingSteps.length - 1 && (
                  <div className="hidden lg:flex flex-col items-center justify-center px-1 text-slate-300">
                    <ArrowRight size={24} />
                    <span className="text-[9px] mt-1 font-bold">Fallback</span>
                  </div>
                )}
                {idx < routingSteps.length - 1 && (
                  <div className="lg:hidden flex items-center justify-center py-2 text-slate-300">
                    <ArrowRight size={24} className="rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section 2: RPA Two-way Matching */}
        <section className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <Search className="text-purple-500" /> RPA 后置审计逻辑 (Post-Extraction Audit)
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <Database size={14} className="text-slate-500"/>
              <span className="text-slate-600">依赖: Reference.xlsx (主名+别名;)</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="w-full md:w-5/12 bg-white p-5 rounded-xl border border-dashed border-slate-300 text-center shadow-sm">
              <p className="text-xs font-bold text-slate-400 mb-2">审计步骤 1</p>
              <p className="text-sm font-bold text-slate-700">按主名或别名列表匹配</p>
              <p className="text-xs text-slate-500 mt-2">系统提取结果优先与台账中的供应商别名(;)比对，若命中则校验金额</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="text-blue-400 mb-1" size={24}/>
              <span className="text-[10px] font-bold text-blue-400 uppercase">双向兜底</span>
            </div>
            <div className="w-full md:w-5/12 bg-white p-5 rounded-xl border border-dashed border-slate-300 text-center shadow-sm">
              <p className="text-xs font-bold text-slate-400 mb-2">审计步骤 2 (若Step 1失败)</p>
              <p className="text-sm font-bold text-slate-700">按金额反向检索</p>
              <p className="text-xs text-slate-500 mt-2">名字彻底面目全非时，通过精准匹配金额，反向找回 Vendor 身份</p>
            </div>
          </div>
        </section>

        {/* Section 3: Visualized Scenarios */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
            <Paintbrush className="text-pink-500" /> Excel 渲染场景模拟 (点选查看高亮策略)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditScenarios.map((s, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedScenario === idx ? 'bg-white border-blue-500 shadow-md' : 'bg-slate-50 border-transparent grayscale-[0.5] hover:grayscale-0'}`}
                onClick={() => setSelectedScenario(idx)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    {s.icon} {s.title}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-${s.color}-100 text-${s.color}-700`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4 h-8">{s.desc}</p>
                <div className={`text-xs font-medium p-2.5 rounded-lg bg-${s.color}-50 text-${s.color}-800 border border-${s.color}-100`}>
                  <span className="font-bold">执行动作:</span> {s.action}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Interactive Excel Preview */}
        <section className="bg-[#1e293b] rounded-2xl p-6 text-white overflow-hidden relative shadow-xl">
          <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
            <FileText size={250} />
          </div>
          <div className="flex justify-between items-end mb-6 relative z-10">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
              <Database className="text-emerald-400" /> Invoice_list_Master.xlsx (最终效果)
            </h2>
            <div className="text-xs font-mono text-slate-400">Powered by Python openpyxl</div>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-600 text-slate-400">
                  <th className="pb-3 pr-4 font-medium">Vendor</th>
                  <th className="pb-3 pr-4 font-medium">Amount (No Tax)</th>
                  <th className="pb-3 pr-4 font-medium">AI Route</th>
                  <th className="pb-3 font-medium">RPA Audit Result</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4">Google Ireland</td>
                  <td className="py-3 pr-4">1,200.00</td>
                  <td className="py-3 pr-4 text-blue-400 text-xs font-mono">Route A</td>
                  <td className="py-3 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 size={14}/> Perfect Match</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4">Amazon Web Services</td>
                  <td className="py-3 pr-4">850.00</td>
                  <td className="py-3 pr-4 text-indigo-400 text-xs font-mono">Route B</td>
                  <td className="py-3 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 size={14}/> Alias Match (via "AWS")</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4">Microsoft</td>
                  <td className="py-3 pr-4"><span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded shadow-sm">5,400.00</span></td>
                  <td className="py-3 pr-4 text-blue-400 text-xs font-mono">Route A</td>
                  <td className="py-3 text-red-400 flex items-center gap-1.5"><AlertTriangle size={14}/> Mismatch! (Ref: 5,000)</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4"><span className="bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded shadow-sm">Acme Corp</span></td>
                  <td className="py-3 pr-4">3,200.00</td>
                  <td className="py-3 pr-4 text-red-400 text-xs font-mono">Route C</td>
                  <td className="py-3 text-yellow-400 flex items-center gap-1.5"><RefreshCw size={14}/> Name Repaired via Amount</td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4 text-slate-400 italic">Unknown New Co.</td>
                  <td className="py-3 pr-4"><span className="bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded shadow-sm">99.99</span></td>
                  <td className="py-3 pr-4 text-blue-400 text-xs font-mono">Route A</td>
                  <td className="py-3 text-slate-400 flex items-center gap-1.5"><FileSearch size={14}/> New Vendor Detected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default App;