import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigureServer } from "./config/config";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigureServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  /**
   * ! constructor defined for listen server
   */
  constructor() {
    super();
    // * setup server
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.dbConnection();

    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use("/api", this.Routes());

    this.Listen();
  }

  Routes(): Array<express.Router> {
    return [new UserRouter().router];
  }

  public Listen() {
    this.app.listen(this.port, () => {
      console.log(`server listen in ${this.port}`);
    });
  }

  async dbConnection(): Promise<DataSource | void> {
    return this.startConnection
      .then(() => console.log(`start connection successfully`))
      .catch((err) => {
        console.error(err);
      });
  }
}

new ServerBootstrap();
