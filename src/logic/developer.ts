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
        *
      from 
        projects as p
      where 
        developer_id = %s
  `,
    id
  );

  const queryFormatDeveloper = format(
    `
  select 
    * 
  from 
    developers 
  where
    id = %s
  `,
    id
  );

  const queryFormatTech = format(
    `
  select 
    * 
  from 
    projects_technologies 
  where
    id = %s
  `,
    id
  );

  const queryResultDeveloper: QueryResult = await client.query(
    queryFormatDeveloper
  );
  const queryResultTech: QueryResult = await client.query(queryFormatTech);
  const queryResult: QueryResult = await client.query(queryFormat);

  return res.status(200).json({
    developer: {
      ...queryResultDeveloper.rows[0],
      projects: queryResult.rows,
      techs: queryResultTech.rows,
    },
  });
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
  return res.status(200).json();
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

  await client.query(queryFormat);

  return res.status(203).json();
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
