import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";

const postDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      insert into 
        developers (%I)
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

const getDeveloper = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
    select  
      d.id, d.name, d.email, 
      d.developer_info_id,
      di.developer_since, 
      di.preferred_os
    from 
      developers d
    left join
      developer_infos di
    on 
      d.developer_info_id  = di.id
    where
        d.id = %s
  `,
    id
  );
  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(200).json(queryResult.rows[0]);
};

const getAllProjectsDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
      select
      d.id as developer_id,
      d.name as developer_name,
      d.email as developer_email,
      d.developer_info_id,
      di.developer_since as developer_info_developer_since,
      di.preferred_OS as developer_info_preferred,
      p.id as project_id,
      p.name as project_name,
      p.description as project_description,
      p.estimated_time as project_estimated_time,
      p.repository as project_repository,
      p.start_date as project_start_date,
      p.end_date as project_end_date,
      t.id as technology_id,
      t.name as technology_name

      from developers as d 

      left join developer_infos as di
      on di.id = d.developer_info_id
      
      left join projects as p
      on p.developer_id = d.id 

      left join projects_technologies as pt
      on pt.project_id = p.id

      left join technologies as t
      on t.id = pt.project_id

      where d.id = %s
  `,
    id
  );

  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(200).json(queryResult.rows);
};

const getAllDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString = `
      select  
        d.id, d.name, d.email, 
        d.developer_info_id,
        di.developer_since, 
        di.preferred_os
      from 
        developers d
      left join
        developer_infos di
      on d.developer_info_id  = di.id;
  `;
  const queryResult: QueryResult = await client.query(queryString);

  return res.status(200).json(queryResult.rows);
};

const patchDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
      update 
        developers
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

  return res.status(200).json(queryResult.rows[0]);
};

const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
      delete from
        developers
      where
        id = %s
  `,
    id
  );
  await client.query(queryFormat);
  return res.status(204).json();
};

const postInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      insert into developer_infos 
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

const patchInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const insert = Object.keys(req.body);
  const values = Object.values(req.body);

  const queryFormat = format(
    `
      update 
        developer_infos
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

  const queryResult = await client.query(queryFormat);

  return res.status(200).json(queryResult.rows[0]);
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
