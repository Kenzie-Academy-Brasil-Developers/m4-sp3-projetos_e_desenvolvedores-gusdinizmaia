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

import { validateDevelopersId, validateInfoId } from "./middlewares/developers";
import {
  validateProjectId,
  validateTechId,
  validateTechName,
} from "./middlewares/projects";

const app: Application = express();

app.use(json());

// DEVELOPER

app.post("/developers", postDeveloper);
app.get("/developers/:id", validateDevelopersId, getDeveloper);
app.get(
  "/developers/:id/projects",
  validateDevelopersId,
  getAllProjectsDeveloper
);
app.get("/developers", getAllDevelopers);
app.patch("/developers/:id", validateDevelopersId, patchDeveloper);
app.delete("/developers/:id", validateDevelopersId, deleteDeveloper);
app.post("/developers/:id/infos", validateInfoId, postInfoDeveloper);
app.patch("/developers/:id/infos", validateInfoId, patchInfoDeveloper);

// PROJECTS

app.post("/projects", postProject);
app.get("/projects/:id", validateProjectId, getProject);
app.get("/projects", getAllProjects);
app.patch("/projects/:id", validateProjectId, patchProject);
app.delete("/projects/:id", validateProjectId, deleteProject);
app.post("/projects/:id/technologies", validateTechId, postTechProject);
app.delete(
  "/projects/:id/technologies/:name",
  validateTechId,
  validateTechName,
  deleteTechProject
);

const PORT = 3000;
app.listen(PORT, async () => {
  startDatabase();
  console.log("server is running");
});
