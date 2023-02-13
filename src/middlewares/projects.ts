import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database/config";

const validateProjectId = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
    select 
        * 
    from 
        developers
    where
        id = %s;
    `,
    id
  );

  const queryResult = await client.query(queryFormat);

  if (!queryResult.rowCount) {
    return resp.status(404).json({
      message: "The Project not exist!",
    });
  }

  return next();
};

const validateTechId = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);

  const queryFormat = format(
    `
    select 
        * 
    from 
        projects_technologies
    where
        id = %s;
    `,
    id
  );

  const queryResult = await client.query(queryFormat);

  if (!queryResult.rowCount) {
    return resp.status(404).json({
      message: "The Project not exist!",
    });
  }

  return next();
};

const validateTechName = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const name = req.params.name;

  const queryFormat = format(
    `
        select 
            * 
        from 
            technologies
        where
            name = %s;
        `,
    name
  );

  const queryResult = await client.query(queryFormat);

  if (!queryResult.rowCount) {
    return resp.status(404).json({ message: "the Tech not exists" });
  }

  return next();
};

export { validateProjectId, validateTechName, validateTechId };
