import config, { IConfig } from "config"
import Knex from "knex"

// Not working TODO
// const dbConfig: IConfig = config.get('App.database');


const knexConfig = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            // database: dbConfig.get('database'),
            database: 'devnology-test'
        }
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'migrations'
    },
    seeds: {
        directory: './seeds'
    }
};



export default knexConfig;