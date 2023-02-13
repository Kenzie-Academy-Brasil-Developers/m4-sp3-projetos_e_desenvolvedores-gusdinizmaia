import { client } from "./config";

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("database conectado");
};

export { startDatabase };
