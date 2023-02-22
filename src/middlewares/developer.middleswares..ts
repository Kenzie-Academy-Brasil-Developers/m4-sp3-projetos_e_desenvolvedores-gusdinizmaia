import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { verificationKeys, verificationTypes } from "../functions";
import {
  requiredDeveloper,
  requiredInfo,
  requiredOs,
} from "../interfaces/developer.interface";

const validateInfoKeys = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const findError = verificationKeys(req.method, req.body, requiredInfo);
  if (findError) {
    return res.status(400).json(findError);
  }

  const findErrorOs = verificationTypes(requiredOs, req.body.preferredOS);
  if (findErrorOs) {
    return res.status(400).json(findErrorOs);
  }

  next();
};

const validateDeveloperKeys = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const findError = verificationKeys(req.method, req.body, requiredDeveloper);

  if (findError) {
    return res.status(400).json(findError);
  }

  next();
};

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

const validateEmail = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryString = `
      select 
          *
      from 
          developers
      where 
        email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.email],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount) {
    return resp.status(409).json({
      message: "The email already exist!",
    });
  }

  next();
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

export {
  validateDevelopersId,
  validateInfoId,
  validateEmail,
  validateDeveloperKeys,
  validateInfoKeys,
};
