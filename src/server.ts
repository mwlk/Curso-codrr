import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigureServer } from "./config/config";

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
    this.app.use(morgan("dev"));
    this.app.use(cors());

    // this.app.use("/api/hello", (req, res) => {
    //   res.status(200).json({
    //     message: "OK",
    //   });
    // });

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
}

new ServerBootstrap();
