import { Response, Request } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { iProject } from "../interfaces/project.interface";

const postProject = async (req: Request, res: Response): Promise<Response> => {
  const insert: string[] = Object.keys(req.body);
  const values: string[] = Object.values(req.body);

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

  const queryResult: QueryResult<iProject> = await client.query(queryFormat);

  return res.status(201).json(queryResult.rows[0]);
};

const getProject = async (req: Request, res: Response): Promise<Response> => {
  const id: number = parseInt(req.params.id);

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
  const insert: string[] = Object.keys(req.body);
  const values: string[] = Object.values(req.body);

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

  const queryResult: QueryResult<iProject> = await client.query(queryFormat);

  return res.status(201).json(queryResult.rows[0]);
};

const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

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
  const name: string = req.body.name;
  const id: number = parseInt(req.params.id);

  const queryFormat = format(
    `
    with tech as (
        select * from technologies t
        where t.name ilike '%s'),
    insert_tech as (
        insert into projects_technologies ("addedIn", "projectId", "technologyId")
        values( current_date , %s , (select t.id from tech t))
        returning * ),
    data as (
      select t.name as "technologyName", t.id as "technologyId",
      p."id" as "projectId", p."name" as "projectName",
      p."description" as "projectDescription", 
      p."estimatedTime" as "projectEstimatedTime",
      p."repository" as "projectRepository",
      p."startDate" as "projectStartDate",
      p."endDate" as "projectEndDate"
      from projects as p
      join insert_tech it on it."projectId" = p.id
      join tech t on t.id = it."technologyId")
    select * from data
    `,
    name,
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
      with
        tech as (
          select * from technologies t
          where t.name ilike '%s' )
      delete from projects_technologies pt
      using tech t
      where pt."projectId" = %s and pt."technologyId" = t.id
  `,
    name,
    id
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
