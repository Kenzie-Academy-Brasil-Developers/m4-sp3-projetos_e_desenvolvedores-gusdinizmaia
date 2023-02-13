interface iDeveloper {
  id: number;
  name: string;
  email: string;
  developer_info_id: number;
}

interface iProjects {
  id: number;
  name: string;
  description: string;
  estimated_time: string;
  repository: string;
  start_date: string;
  end_date?: number;
  developer_id: number;
}

interface iTechs {
  id: number;
  name: string;
}

interface iProjectsTechs {
  id: number;
  added_in: string;
  project_id: string;
  technology_id: number;
}
