import { Response, Request } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";

const postProject = async (req: Request, res: Response): Promise<Response> => {
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
    values
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(201).json(queryResult.rows[0]);
};

const getProject = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);

  const queryString = `
      select 
      p.*, t.id as "technologyId", 
      t.name as "technologyName"
    from
      projects p
    left join 
      projects_technologies pt
    on
      pt."projectId" = p.id
    left join 
      technologies t
    on
      t.id = pt."technologyId"
      where 
        p.id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows);
};

const getAllProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString = `
    select 
      p.*, t.id as "technologyId", 
      t.name as "technologyName"
    from
      projects p
    left join 
      projects_technologies pt
    on
      pt."projectId" = p.id
    left join 
      technologies t
    on
      t.id = pt."technologyId"
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

  return res.status(204).json();
};

const postTechProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const added = req.body.addedIn;

  const queryFormat = format(
    `
      insert into projects_technologies
        (%I) 
      values 
        (%L)
      returning *
  `
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

  const queryString = `
    select t.id
    from projects_technologies as pt
    full join technologies as t
    on pt.technology_id = t.id
    where t.name ilike $1
`;

  const queryFormatTech = {
    text: queryString,
    values: [name],
  };

  const queryResultName: QueryResult = await client.query(queryFormatTech);

  const queryFormat = format(
    `
      delete from
        projects_technologies pt
      using
        technologies t
      where 
        pt.project_id = %s AND
        pt.technology_id = %s

  `,
    id,
    queryResultName.rows[0].id
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
