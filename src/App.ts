import express from 'express';
import * as bodyParser from 'body-parser';
import morgen from 'morgan';


export default class App {

    public app: express.Application;
    public port: number | string;
    public mode: string;

    constructor(app: express.Application, controllers: Array<any>, port: number | string) {
        this.app = app;
        this.port = port;
        this.mode = process.env.RUNNING_MODE || "dev";

        this.initMiddleWares();
        this.initControllers(controllers);
    }

    private initMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        if (this.mode != "production") {
            this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
                console.log(`${request.method} ${request.path}`);
                next();
            })
        }

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

            if (req.method === 'OPTIONS') {
                return res.status(200).end();
            }
            return next();
        });
        this.app.use(morgen(this.mode))
    }

    private initControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use(controller.path, controller.router)
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}