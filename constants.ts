import { ContractType, ContractInfo } from './types';

export const PDF_CONTENT = `
ASESORÍA LEGAL & FINANCIERA: Guía para Adquisición de Vivienda en Colombia.

1. EL CONTRATO DE TRABAJO
El tipo de contrato define tu 'riesgo' como deudor para el banco.
- Contrato a Término Indefinido: Favorito de los bancos. No tiene fecha de fin. Genera mayor confianza.
- Contrato a Término Fijo: Fecha de inicio y fin clara. El banco pide haberlo renovado al menos una vez.
- Contrato por Obra o Labor: Dura lo que dura la tarea. Bancos piden mayor antigüedad o codeudor.
- Prestación de Servicios (OPS): Legalmente es civil, no laboral. Para el banco eres 'Independiente'. Requiere extractos bancarios.

2. LA JORNADA LABORAL: EL TIEMPO ES DINERO
Conceptos que aumentan tu nómina y capacidad de endeudamiento:
- Trabajo Diurno: 6am - 9pm.
- Trabajo Nocturno: 9pm - 6am (Recargo 35%).
- Horas Extras Diurnas: 25% extra.
- Horas Extras Nocturnas: 75% extra.
- Dominicales y Festivos: Recargo del 75%.
CONSEJO: Asegúrate de que los recargos se reflejen en los desprendibles. Los bancos promedian esto.

3. SALARIO
- SMLMV: Salario Mínimo Legal.
- Salario Integral: >10 SMLMV. Incluye prestaciones en el pago mensual (sin cesantías en fondo).
- Pagos en Especie: No pueden superar el 30% del salario.

4. PRESTACIONES SOCIALES (AHORRO)
- Intereses a las Cesantías: Empleador paga en enero el 12% anual sobre cesantías. Útil para escrituración.
- Prima de Servicios: Un mes de salario al año (mitad junio, mitad diciembre). Ideal para cuotas extraordinarias.

5. SEGURIDAD SOCIAL
Evasión es causal de negación de crédito.
- Salud (EPS): 12.5% (Trabajador 4%).
- Pensión (AFP): 16% (Ahorro vejez).
- ARL: 100% empleador.
- Caja de Compensación: Permite postularse al Subsidio de Vivienda.

RECOMENDACIÓN FINAL
1. Conserva desprendibles de nómina (3-6 meses).
2. Revisa cesantías en el fondo.
3. Mantén seguridad social al día.
`;

export const CONTRACT_INFO: Record<ContractType, ContractInfo> = {
  [ContractType.INDEFINITE]: {
    type: ContractType.INDEFINITE,
    label: 'Término Indefinido',
    riskLevel: 'Bajo',
    bankView: 'Favorito del Banco',
    description: 'Genera la mayor confianza para el estudio de crédito al no tener fecha de finalización.'
  },
  [ContractType.FIXED]: {
    type: ContractType.FIXED,
    label: 'Término Fijo',
    riskLevel: 'Medio',
    bankView: 'Requiere Renovación',
    description: 'El banco usualmente pedirá que hayas renovado el contrato al menos una vez.'
  },
  [ContractType.OBRA_LABOR]: {
    type: ContractType.OBRA_LABOR,
    label: 'Obra o Labor',
    riskLevel: 'Medio',
    bankView: 'Requiere Antigüedad',
    description: 'Los bancos suelen pedir una antigüedad mayor o un codeudor debido a la naturaleza temporal.'
  },
  [ContractType.OPS]: {
    type: ContractType.OPS,
    label: 'Prestación de Servicios',
    riskLevel: 'Alto',
    bankView: 'Independiente',
    description: 'No es contrato laboral. Debes demostrar ingresos mediante extractos bancarios sólidos.'
  }
};