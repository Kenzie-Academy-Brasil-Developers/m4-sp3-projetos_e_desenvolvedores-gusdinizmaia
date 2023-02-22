const requiredDeveloper = ["name", "email"];
const requiredInfo = ["developerSince", "preferredOS"];
const requiredOs = ["Windows", "Linux", "MacOS"];

interface iDeveloper {
  id: number;
  name: string;
  email: string;
  developerInfoId: number;
}

interface iDeveloperInfo {
  id: number;
  developerSince: string;
  preferredOS: string;
}

export {
  iDeveloper,
  iDeveloperInfo,
  requiredDeveloper,
  requiredInfo,
  requiredOs,
};
