import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database/config";

const validateDevelopersId = async (
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
      message: "The developer not exist!",
    });
  }

  return next();
};

const validateInfoId = async (
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
        developer_infos
    where
        id = %s;
    `,
    id
  );

  const queryResult = await client.query(queryFormat);

  if (!queryResult.rowCount) {
    return resp.status(404).json({
      message: "The Info not exist!",
    });
  }

  return next();
};

export { validateDevelopersId, validateInfoId };
