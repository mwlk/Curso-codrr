import express from "express";
import morgan from "morgan";
import cors from "cors";

class ServerBootstrap {
  public app: express.Application = express();
  private port: number = 8080;

  /**
   * ! constructor defined for listen server
   */
  constructor() {
    // * setup server
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.Listen();
  }

  public Listen() {
    this.app.listen(this.port, () => {
      console.log(`server listen in ${this.port}`);
    });
  }
}

new ServerBootstrap();
