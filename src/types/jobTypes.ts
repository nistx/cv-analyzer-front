export interface JobDescriptionResponse {
  job_description: string;
  cvs: CV[];
}

export interface CV {
  id: string;
  personal_data?: PersonalData;
  profile_summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills: Skill[];
  certifications?: Certification[] | null;
  languages?: Language[];
  projects?: Project[] | null;
  volunteering?: Volunteering[] | null;
  ranking: number;
  qualification_status?: boolean
}

export interface PersonalData {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string | null;
  end_date?: string | null;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  start_date: string | null;
  graduation_date?: string | null;
  achievements?: string | null;
}

export interface Skill {
  type: 'soft' | 'technical';
  name: string;
  score: number;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Project {
  name: string;
  description?: string;
}

export interface Volunteering {
  organization?: string;
  role?: string;
  description?: string;
}

export interface Certification {
  certification: string;
  date_obtained?: string | null;
}
