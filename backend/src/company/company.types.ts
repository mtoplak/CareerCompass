export interface Averages {
    team: number;
    personal_development: number;
    flexibility: number;
    work_life_balance: number;
    work_enviroment: number;
    leadership: number;
    benefits: number;
    bonuses: number;
  }
  
  export interface CompanyAverages extends Averages {
    experience: string;
    duration: string;
    difficulty: string;
    remote_work: boolean;
  }
  