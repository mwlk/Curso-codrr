import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { AppDataSource } from "./data.source";

export abstract class ConfigureServer {
  constructor() {
    const nodeEnvName = this.createPathEnv(this.nodeEnv);

    dotenv.config({
      path: nodeEnvName,
    });
  }

  public getEnvironment(k: string) {
    return process.env[k];
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"];

    if (path.length > 0) {
      const stringToArray = path.split(".");

      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  public get TypeORMConfig(): DataSourceOptions {
    return {
      type: "mysql",
    };
  }

  get startConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
