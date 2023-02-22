const requiredProject = [
  "name",
  "description",
  "estimatedTime",
  "repository",
  "startDate",
  "developerId",
];
const requiredTech = ["name"];

interface iProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: string;
  endDate?: number;
  developerId: number;
}

interface iProjectTech {
  id: number;
  addedIn: string;
  projectId: string;
  technologyId: number;
}

export { iProject, iProjectTech, requiredProject, requiredTech };
