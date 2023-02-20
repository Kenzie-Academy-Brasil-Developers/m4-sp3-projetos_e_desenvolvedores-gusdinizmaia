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
      d."id" as "developerId",d."name" as "developerName",
      d."email" as "developerEmail",d."developerInfoId",
      di."developerSince" as "developerInfoDeveloperSince",
      di."preferredOS" as "developerInfoPreferredOS"
    from 
      developers d
    left join
      developer_infos di
    on 
      d."developerInfoId"  = di.id
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
      d.id as "developerId",
      d.name as "developerName",
      d.email as "developerEmail",
      d."developerInfoId",
      di."developerSince" as "developerInfoDeveloperSince",
      di."preferredOS" as "developerInfoPreferred",
      p.id as "projectId",
      p.name as "projectName",
      p.description as "projectDescription",
      p."estimatedTime" as "projectEstimatedTime",
      p.repository as "projectRepository",
      p."startDate" as "projectStartDate",
      p."endDate" as "projectEndDate",
      t.id as "technologyId",
      t.name as "technologyName"
      from developers as d 
      left join developer_infos as di on di.id = d."developerInfoId"
      left join projects as p on p."developerId" = d.id 
      left join projects_technologies as pt on pt."projectId" = p.id
      left join technologies as t on t.id = pt."projectId"
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
        d."id" as "developerId",d."name" as "developerName",
        d."email" as "developerEmail",d."developerInfoId",
        di."developerSince" as "developerInfoDeveloperSince",
        di."preferredOS" as "developerInfoPreferredOS"
      from 
        developers d
      left join
        developer_infos di
      on d."developerInfoId"  = di.id;
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

  console.log(req.body);

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
    with dev as (
      delete from developers d
      where d.id = %s
      returning *
    )
    delete from developer_infos di
    using dev d
    where di.id = d."developerInfoId"
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
    with data as
      (insert into developer_infos (%I) 
      values (%L)
      returning *),
    data2 as (
      update developers as d
      set "developerInfoId" = data.id
      from data
      where d.id = %s
      returning *
    )
    select * from data;
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
      update developer_infos dt
      set (%I) = row(%L)
      from developers d
      where d."developerInfoId" = dt.id 
      and d.id = %s
      returning dt.*
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
