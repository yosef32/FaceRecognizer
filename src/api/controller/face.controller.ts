import express from "express";
import FaceManager from "../manager/face.manager";

export default class FaceController {

  public path: string;
  public router = express.Router();
  private manager: FaceManager;

  constructor(path: string) {
    this.manager = new FaceManager();
    this.path = path;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/add/person", this.addPerson.bind(this));
    this.router.get("/fined/person/:id", this.finedPerson.bind(this));
  }

  public async addPerson(req: express.Request, res: express.Response) {
    const vector = req.body;
    this.manager.addPerson(vector).then(() => {
      res.status(200).send({ success: true })
    }).catch(err => {
      console.log(err)
      res.status(501).send({ success: false })
    })
  }
  public async finedPerson(req: express.Request, res: express.Response) {
    const id = req.params.id;
    res.send(await this.manager.finedPerson(id));
  }
}
