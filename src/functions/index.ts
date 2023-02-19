const requiredDeveloper = ["name", "email"];
const requiredInfo = ["developerSince", "preferredOS"];
const requiredOs = ["Windows", "Linux", "MacOS"];
const requiredProject = [
  "name",
  "description",
  "estimatedTime",
  "repository",
  "startDate",
  "developerId",
];
const requiredTech = ["name"];

const verificationKeys = (method: string, body: any, required: string[]) => {
  const keys = Object.keys(body);
  keys.forEach((elem) => (required.includes(elem) ? elem : delete body[elem]));

  const newKeys = Object.keys(body);

  console.log(newKeys);

  if (newKeys.length <= 0) {
    return {
      message: "Missing required keys",
      keys: required,
    };
  }

  switch (method) {
    case "POST": {
      const findError = required.filter((elem) => !newKeys.includes(elem));
      return findError.length <= 0
        ? false
        : {
            message: "Missing required keys",
            keys: findError,
          };
    }
    case "PACTH": {
      const findError = required.some((elem) => newKeys.includes(elem));
      return findError
        ? false
        : {
            message: "Missing required keys, you need at least one",
            keys: findError,
          };
    }
  }
};

const verificationTypes = (required: string[], body: any) => {
  return required.includes(body)
    ? false
    : {
        message: "Missing required keys, you need at least one",
        keys: required,
      };
};

export {
  requiredDeveloper,
  requiredInfo,
  requiredOs,
  requiredProject,
  requiredTech,
  verificationKeys,
  verificationTypes,
};
