import { client } from "../database/config";

const requiredDeveloper = ["name", "email"];
const requiredInfo = ["developer_since", "preferred_os"];
const requiredProject = [
  "name",
  "description",
  "estimated_time",
  "repository",
  "start_date",
  "developer_id",
];
const requiredTech = ["added_in", "name"];

const verificationKeys = (body: any, required: string[]) => {
  const keys = Object.keys(body);

  keys.forEach((elem) => (required.includes(elem) ? "" : delete body[elem]));

  const findError = required.filter((elem) => !keys.includes(elem));

  if (findError.length > 0) {
    return {
      message: "Missing required keys",
      keys: findError,
    };
  }

  return false;
};

// const searchTech = async (tech: number) => {
//   const queryString = `
//     select
//       *
//     from
//       technologies
//     where
//       'name' ilike'React'
//   `;

//   // const queryConfig = {
//   //   text: queryString,
//   //   values: [tech],
//   // };

//   const queryResult = await client.query(queryString);

//   return queryResult.rows[0].name;
// };

export {
  requiredDeveloper,
  requiredInfo,
  requiredProject,
  requiredTech,
  verificationKeys,
};
