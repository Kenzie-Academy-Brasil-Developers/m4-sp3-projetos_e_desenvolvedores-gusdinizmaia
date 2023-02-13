import { Response, Request } from "express";

const postProject = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const getProject = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const getAllProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const patchProject = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const postTechProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const deleteTechProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export {
  postProject,
  getProject,
  getAllProjects,
  patchProject,
  deleteProject,
  postTechProject,
  deleteTechProject,
};
