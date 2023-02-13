import { Request, Response } from "express";

const postDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const getDeveloper = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("");
};

const getAllProjectsDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const getAllDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const patchDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const postInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

const patchInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json("");
};

export {
  postDeveloper,
  getDeveloper,
  getAllProjectsDeveloper,
  getAllDevelopers,
  patchDeveloper,
  deleteDeveloper,
  postInfoDeveloper,
  patchInfoDeveloper,
};
