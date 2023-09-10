export interface Project {
    id: string;
    name: string;
    contact: string | null;
    start_date: string | null;
    end_date: string | null;
}

export interface Customer {
    id: string;
    isActive: boolean;
    company: string;
    industry: string;
    projects: Project[];
    about: string;
}

export type Customers = Customer[];
