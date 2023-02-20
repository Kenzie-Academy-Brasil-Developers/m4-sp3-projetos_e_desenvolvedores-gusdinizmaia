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

import {
  validateDevelopersId,
  validateInfoId,
  validateEmail,
  validateDeveloperKeys,
  validateInfoKeys,
} from "./middlewares/developers";
import {
  validateProjectId,
  validateProjectKeys,
  validateDevProjects,
  validateTechKeys,
} from "./middlewares/projects";

const app: Application = express();

app.use(json());

// DEVELOPER

app.post("/developers", validateDeveloperKeys, validateEmail, postDeveloper);
app.get("/developers/:id", validateDevelopersId, getDeveloper);
app.get(
  "/developers/:id/projects",
  validateDevelopersId,
  getAllProjectsDeveloper
);
app.get("/developers", getAllDevelopers);
app.patch(
  "/developers/:id",
  validateDeveloperKeys,
  validateDevelopersId,
  validateEmail,
  patchDeveloper
);
app.delete("/developers/:id", validateDevelopersId, deleteDeveloper);
app.post(
  "/developers/:id/infos",
  validateInfoKeys,
  validateDevelopersId,
  postInfoDeveloper
);
app.patch(
  "/developers/:id/infos",
  validateInfoKeys,
  validateDevelopersId,
  patchInfoDeveloper
);

// PROJECTS

app.post("/projects", validateProjectKeys, validateDevProjects, postProject);
app.get("/projects/:id", validateProjectId, getProject);
app.get("/projects", getAllProjects);
app.patch(
  "/projects/:id",
  validateProjectKeys,
  validateProjectId,
  patchProject
);
app.delete("/projects/:id", validateProjectId, deleteProject);
app.post(
  "/projects/:id/technologies",
  validateTechKeys,
  validateProjectId,
  postTechProject
);
app.delete(
  "/projects/:id/technologies/:name",
  validateProjectId,
  deleteTechProject
);

const PORT = 3000;
app.listen(PORT, async () => {
  startDatabase();
  console.log("server is running");
});
