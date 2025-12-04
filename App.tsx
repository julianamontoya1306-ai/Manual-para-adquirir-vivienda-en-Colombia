import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ContractType } from './types';
import { CONTRACT_INFO } from './constants';
import { IncomeCalculator } from './components/Calculator';
import { AIChat } from './components/AIChat';

function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'calculator' | 'guide' | 'ai'>('profile');
  const [selectedContract, setSelectedContract] = useState<ContractType | null>(null);

  // Components for sections
  const ContractSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Object.values(CONTRACT_INFO).map((contract) => (
        <button
          key={contract.type}
          onClick={() => setSelectedContract(contract.type)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left relative overflow-hidden group ${
            selectedContract === contract.type 
              ? 'border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-200 ring-offset-2' 
              : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-lg ${
              contract.riskLevel === 'Bajo' ? 'bg-emerald-100 text-emerald-700' :
              contract.riskLevel === 'Medio' ? 'bg-amber-100 text-amber-700' :
              'bg-rose-100 text-rose-700'
            }`}>
              <Briefcase className="w-5 h-5" />
            </div>
            {selectedContract === contract.type && (
              <CheckCircle className="w-5 h-5 text-brand-600" />
            )}
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">{contract.label}</h3>
          <p className="text-xs text-slate-500">{contract.description}</p>
        </button>
      ))}
    </div>
  );

  const RiskAnalysis = () => {
    if (!selectedContract) return null;
    const info = CONTRACT_INFO[selectedContract];
    
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 animate-fade-in">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-brand-600" />
          Análisis de Perfil Bancario
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Nivel de Riesgo</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-3 w-full rounded-full bg-slate-100 overflow-hidden`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      info.riskLevel === 'Bajo' ? 'w-1/3 bg-emerald-500' :
                      info.riskLevel === 'Medio' ? 'w-2/3 bg-amber-500' :
                      'w-full bg-rose-500'
                    }`}
                  />
                </div>
                <span className={`text-sm font-bold ${
                   info.riskLevel === 'Bajo' ? 'text-emerald-600' :
                   info.riskLevel === 'Medio' ? 'text-amber-600' :
                   'text-rose-600'
                }`}>{info.riskLevel}</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="font-medium text-slate-900 mb-2">Visión del Banco</h4>
               <p className="text-slate-600 text-sm">{info.bankView}</p>
               {info.type === ContractType.OPS && (
                 <div className="mt-3 flex items-start gap-2 text-rose-600 text-xs bg-rose-50 p-2 rounded">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>Necesitas extractos bancarios impecables para demostrar tus ingresos.</span>
                 </div>
               )}
            </div>
          </div>
          <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
             <h4 className="font-medium text-slate-900 mb-3">Recomendaciones</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                 <span>Mantén tus pagos de seguridad social al día.</span>
               </li>
               <li className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                 <span>Guarda tus desprendibles de los últimos 6 meses.</span>
               </li>
               {info.type === ContractType.FIXED && (
                 <li className="flex items-center gap-2 text-sm text-slate-600">
                   <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                   <span>Intenta renovar el contrato antes de aplicar.</span>
                 </li>
               )}
             </ul>
          </div>
        </div>
      </div>
    );
  };

  const GuideSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
             <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Jornada y Horarios</h3>
          <p className="text-slate-600 text-sm mb-4">
            El tiempo es dinero. Entender tu jornada es vital porque el trabajo extra aumenta tu cupo de endeudamiento.
          </p>
          <ul className="text-sm space-y-2 text-slate-500">
            <li>• Diurno: 6am - 9pm</li>
            <li>• Nocturno: 9pm - 6am (35% extra)</li>
          </ul>
       </div>

       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
             <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Prestaciones Sociales</h3>
          <p className="text-slate-600 text-sm mb-4">
             Tu colchón financiero para la cuota inicial y gastos de escrituración.
          </p>
          <ul className="text-sm space-y-2 text-slate-500">
            <li>• <strong>Cesantías + Intereses:</strong> Usar para gastos de cierre.</li>
            <li>• <strong>Prima:</strong> Usar para cuotas extraordinarias.</li>
          </ul>
       </div>
       
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 md:col-span-2">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
             <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Seguridad Social: Tu Red de Protección</h3>
          <p className="text-slate-600 text-sm mb-4">
             Para que un banco te preste, debe ver que estás cubierto. La evasión es causal inmediata de negación.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
             <div className="bg-slate-50 p-3 rounded text-center">
                <span className="block font-bold text-slate-700">EPS (Salud)</span>
                <span className="text-xs text-slate-500">12.5%</span>
             </div>
             <div className="bg-slate-50 p-3 rounded text-center">
                <span className="block font-bold text-slate-700">AFP (Pensión)</span>
                <span className="text-xs text-slate-500">16%</span>
             </div>
             <div className="bg-slate-50 p-3 rounded text-center">
                <span className="block font-bold text-slate-700">ARL</span>
                <span className="text-xs text-slate-500">100% Empleador</span>
             </div>
             <div className="bg-slate-50 p-3 rounded text-center">
                <span className="block font-bold text-slate-700">Caja Comp.</span>
                <span className="text-xs text-slate-500">Subsidios</span>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-brand-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <FileText className="w-6 h-6 text-emerald-400" />
             </div>
             <div>
               <h1 className="text-xl font-bold tracking-tight">Tu Perfil Vivienda</h1>
               <p className="text-xs text-brand-200">Guía Legal & Financiera - Colombia</p>
             </div>
          </div>
          
          <nav className="flex bg-brand-800 rounded-lg p-1 overflow-x-auto max-w-full">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'bg-white text-brand-900 shadow' : 'text-brand-100 hover:text-white hover:bg-white/10'}`}
            >
              Mi Perfil
            </button>
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-white text-brand-900 shadow' : 'text-brand-100 hover:text-white hover:bg-white/10'}`}
            >
              Calculadora
            </button>
            <button 
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'guide' ? 'bg-white text-brand-900 shadow' : 'text-brand-100 hover:text-white hover:bg-white/10'}`}
            >
              Guía
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'ai' ? 'bg-indigo-600 text-white shadow' : 'text-brand-100 hover:text-white hover:bg-white/10'}`}
            >
              Asesor IA
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        
        {activeTab === 'profile' && (
          <div className="animate-slide-up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Prepara tu Perfil</h2>
              <p className="text-slate-600">
                El primer paso no es buscar casa, es organizar la casa financiera. Selecciona tu tipo de contrato para ver cómo te analizan los bancos.
              </p>
            </div>
            <ContractSelector />
            <RiskAnalysis />
            {!selectedContract && (
               <div className="text-center p-10 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                  <p className="text-slate-400">Selecciona un tipo de contrato arriba para ver el análisis.</p>
               </div>
            )}
            
            <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-slate-800">Checklist: Listo para el Banco</h3>
              <div className="space-y-3">
                 {[
                   "Tengo mis desprendibles de nómina de los últimos 3 a 6 meses.",
                   "Verifiqué que mis cesantías están depositadas en el fondo.",
                   "Mi seguridad social (Salud, Pensión, ARL) está al día.",
                   "Si tengo ingresos variables, aparecen en los desprendibles."
                 ].map((item, i) => (
                   <label key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                     <div className="relative flex items-center">
                        <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-brand-500 checked:bg-brand-500 hover:border-brand-400" />
                        <CheckCircle className="pointer-events-none absolute left-0 top-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                     </div>
                     <span className="text-slate-700 group-hover:text-slate-900">{item}</span>
                   </label>
                 ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="animate-slide-up">
             <IncomeCalculator />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="animate-slide-up">
             <div className="mb-8">
               <h2 className="text-2xl font-bold text-slate-900">Pilares Fundamentales</h2>
               <p className="text-slate-600">Conceptos claves que todo aspirante a vivienda debe dominar.</p>
             </div>
             <GuideSection />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="animate-slide-up max-w-3xl mx-auto">
             <div className="mb-6 text-center">
               <h2 className="text-2xl font-bold text-slate-900">Asesor Virtual Inteligente</h2>
               <p className="text-slate-600">Pregunta sobre tu caso específico usando la información oficial de la guía.</p>
             </div>
             <AIChat />
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2024 Asesoría Legal & Financiera Colombia.</p>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
            <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;