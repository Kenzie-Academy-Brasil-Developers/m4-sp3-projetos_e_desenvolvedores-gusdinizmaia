import { Response, Request } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";

const postProject = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      insert into projects 
        (%I) 
      values 
        (%L)
      returning *
  `,
    insert,
    values,
    id
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(201).json(queryResult.rows[0]);
};

const getProject = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  const queryFormat = format(
    `
      select 
        *
      from
        projects 
      where 
        id = %s
  `,
    id
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(200).json(queryResult.rows[0]);
};

const getAllProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString = `
      select 
        *
      from
        projects 
  `;

  const queryResult: QueryResult = await client.query(queryString);

  return res.status(200).json(queryResult.rows);
};

const patchProject = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      update 
        projects 
      set 
        (%I) = row(%L)
      where 
        id = %s
      returning *
  `,
    insert,
    values,
    id
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(201).json(queryResult.rows[0]);
};

const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
      delete from
        projects 
      where 
        id = %s
  `,
    id
  );

  await client.query(queryFormat);

  return res.status(200).json();
};

const postTechProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      insert into projects_technologies
        (%I) 
      values 
        (%L)
      returning *
  `,
    insert,
    values,
    id
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteTechProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const name = req.params.name;

  const queryFormat = format(
    `
      delete from
        projects_technologies as pt
      join
        projects as p
      on 
        pt.id = %s
  `,
    id,
    name
  );

  await client.query(queryFormat);

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
