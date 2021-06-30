import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
// Controller

// cannot import using es
// installing @types/sinesp-api failed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinespApi = require('sinesp-api');

// DataBase imports
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';
import { CarroController } from './controllers/carro';
import Venda from './model/venda';
import { VendaController } from './controllers/venda';

const knex = Knex(knexConfig.development);
export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }

    private async databaseSetup(): Promise<void> {
        await Model.knex(knex);
        // console.log('DB is setup i guess?');
    }

    public async close(): Promise<void> {
        await knex.destroy();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    //TODO - Lembrar dos controllers
    private setupControllers(): void {
        const carroController: CarroController = new CarroController();
        const vendaController: VendaController = new VendaController();

        this.addControllers([
            carroController,
            vendaController
        ])
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log('Express in:', this.port);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}
