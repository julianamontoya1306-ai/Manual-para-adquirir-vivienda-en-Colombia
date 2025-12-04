import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculationInput } from '../types';
import { Calculator, DollarSign, AlertCircle } from 'lucide-react';

export const IncomeCalculator: React.FC = () => {
  const [input, setInput] = useState<CalculationInput>({
    baseSalary: 1300000, // Example starting value (approx min wage)
    nightHours: 0,
    dayOvertime: 0,
    nightOvertime: 0,
    sundayHours: 0
  });

  const [total, setTotal] = useState(0);
  const [breakdown, setBreakdown] = useState<any[]>([]);

  // Surcharges defined in PDF
  const RATES = {
    night: 0.35,        // 35%
    dayOver: 1.25,      // 25% extra (so 1.25 total factor)
    nightOver: 1.75,    // 75% extra
    sunday: 1.75        // 75% extra
  };

  useEffect(() => {
    // Calculate Hourly Rate (approx 240 hours/month standard in Colombia for calculation, or base/30/8)
    const hourlyRate = input.baseSalary / 240; 

    // Calculations based on monthly estimates input by user
    const nightSurchargeVal = (input.nightHours * hourlyRate * RATES.night);
    const dayOverVal = (input.dayOvertime * hourlyRate * RATES.dayOver); 
    // Note: Standard Day Overtime is usually factor 1.25 (100% + 25%).
    // Note: The PDF says "Diurnas 25% extra". So if it's overtime, you get paid the hour + 25%.
    // If input is "Hours of Overtime", the value is BaseHour * 1.25.
    
    const nightOverVal = (input.nightOvertime * hourlyRate * RATES.nightOver);
    const sundayVal = (input.sundayHours * hourlyRate * RATES.sunday);

    const extraIncome = nightSurchargeVal + dayOverVal + nightOverVal + sundayVal;
    const finalTotal = input.baseSalary + extraIncome;

    setTotal(finalTotal);

    setBreakdown([
      { name: 'Base', value: input.baseSalary, color: '#0ea5e9' },
      { name: 'Extras', value: extraIncome, color: '#10b981' }
    ]);

  }, [input]);

  const handleChange = (field: keyof CalculationInput, value: string) => {
    const numVal = parseFloat(value) || 0;
    setInput(prev => ({ ...prev, [field]: numVal }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-brand-900 p-6 text-white">
         <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold">Calculadora de Capacidad</h2>
         </div>
         <p className="text-brand-100 text-sm">
            Los bancos promedian tus recargos. Ingresa tu promedio mensual de horas extra para ver tu "Salario Bancario".
         </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salario Base Mensual</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">$</span>
              <input
                type="number"
                value={input.baseSalary}
                onChange={(e) => handleChange('baseSalary', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Horas Nocturnas (Mes)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={input.nightHours || ''}
                  onChange={(e) => handleChange('nightHours', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-brand-500 text-sm"
                />
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">H. Extras Diurnas</label>
                <input
                  type="number"
                  placeholder="0"
                  value={input.dayOvertime || ''}
                  onChange={(e) => handleChange('dayOvertime', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-brand-500 text-sm"
                />
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">H. Extras Nocturnas</label>
                <input
                  type="number"
                  placeholder="0"
                  value={input.nightOvertime || ''}
                  onChange={(e) => handleChange('nightOvertime', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-brand-500 text-sm"
                />
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Dominicales/Festivos</label>
                <input
                  type="number"
                  placeholder="0"
                  value={input.sundayHours || ''}
                  onChange={(e) => handleChange('sundayHours', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-brand-500 text-sm"
                />
             </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg flex gap-2 text-xs text-blue-800 border border-blue-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>El banco verificará estos ingresos adicionales en tus desprendibles. Asegúrate de que estén registrados oficialmente.</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
           <h3 className="text-slate-500 font-medium mb-4">Proyección de Ingresos Totales</h3>
           <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={breakdown}>
                 <XAxis dataKey="name" tick={{fontSize: 12}} />
                 <YAxis hide />
                 <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Monto']}
                    cursor={{fill: 'transparent'}}
                 />
                 <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
           
           <div className="w-full mt-4 text-center">
             <span className="block text-sm text-slate-500">Ingreso Mensual Estimado</span>
             <div className="flex items-center justify-center text-3xl font-bold text-brand-700">
                <DollarSign className="w-6 h-6 text-brand-500" />
                {total.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
             </div>
             {total > input.baseSalary && (
               <span className="text-emerald-600 text-sm font-semibold mt-1 block">
                 +${(total - input.baseSalary).toLocaleString('es-CO')} en variables
               </span>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};