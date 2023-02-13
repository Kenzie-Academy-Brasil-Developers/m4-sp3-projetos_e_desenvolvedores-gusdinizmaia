import express, { Application, json } from "express";
import { startDatabase } from "./database/connection";
import {
  deleteDeveloper,
  getAllDevelopers,
  getAllProjectsDeveloper,
  getDeveloper,
  patchDeveloper,
  patchInfoDeveloper,
  postDeveloper,
  postInfoDeveloper,
} from "./logic/developer";

import {
  deleteProject,
  deleteTechProject,
  getAllProjects,
  getProject,
  patchProject,
  postProject,
  postTechProject,
} from "./logic/projects";

const app: Application = express();

app.use(json());

// DEVELOPER

app.post("/developers", postDeveloper);
app.get("/developers/:id", getDeveloper);
app.get("/developers/:id/projects", getAllProjectsDeveloper);
app.get("/developers", getAllDevelopers);
app.patch("/developers/:id", patchDeveloper);
app.delete("/developers/:id", deleteDeveloper);
app.post("/developers/:id/infos", postInfoDeveloper);
app.patch("/developers/:id/infos", patchInfoDeveloper);

// PROJECTS

app.post("/projects", postProject);
app.get("/projects/:id", getProject);
app.get("/projects", getAllProjects);
app.patch("/projects/:id", patchProject);
app.delete("/projects/:id", deleteProject);
app.post("/projects/:id/technologies", postTechProject);
app.delete("/projects/:id/technologies/:name", deleteTechProject);

const PORT = 3000;
app.listen(PORT, async () => {
  startDatabase();
  console.log("server is running");
});
