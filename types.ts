export enum ContractType {
  INDEFINITE = 'INDEFINITE',
  FIXED = 'FIXED',
  OBRA_LABOR = 'OBRA_LABOR',
  OPS = 'OPS'
}

export interface CalculationInput {
  baseSalary: number;
  nightHours: number;
  dayOvertime: number;
  nightOvertime: number;
  sundayHours: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ContractInfo {
  type: ContractType;
  label: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  bankView: string;
  description: string;
}