const verificationKeys = (method: string, body: any, required: string[]) => {
  const keys: string[] | [] = Object.keys(body);
  keys.forEach((elem) => (required.includes(elem) ? elem : delete body[elem]));

  const newKeys = Object.keys(body);

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
            message: "At least one of those keys must be send.",
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

export { verificationKeys, verificationTypes };
