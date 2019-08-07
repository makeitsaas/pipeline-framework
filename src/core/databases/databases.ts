import { Directories } from '../utils/directories';
import { Connection, ConnectionOptions, createConnection } from "typeorm";
const fs = require('fs');

export const Databases: {
    [key: string]: Connection
} = {};

export const loadDatabases = async () => {
    console.log('load databases');
    const databasesCodes = fs.readdirSync(Directories.getDatabasesDir());

    return Promise.all(databasesCodes.map(async (databaseCode: string) => {
        console.log(databaseCode);
        return createConnection(getConnectionOptions(databaseCode)).then(connection => {
            // here you can start to work with your entities
            Databases[databaseCode] = connection;
            return connection;
        }).catch(error => {
            throw error;
        })
    }))
};


const getConnectionOptions = (code: string): ConnectionOptions => {
    const options: ConnectionOptions = {
        type: "mysql",
        host: process.env[`DB_${code.toUpperCase()}_HOSTNAME`],
        port: 3306,
        username: process.env[`DB_${code.toUpperCase()}_USERNAME`],
        password: process.env[`DB_${code.toUpperCase()}_PASSWORD`],
        database: process.env[`DB_${code.toUpperCase()}_DATABASE`],
        entities: Directories.getDatabaseEntitiesFiles(code),
        synchronize: false,
        logging: false
    };

    console.log(options);

    return options;
};
