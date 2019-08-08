import * as fs from 'fs';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Directories } from '../utils/directories';

export const Databases: {
    [key: string]: Connection;
} = {};

export const loadDatabases = async () => {
    console.log('load databases');
    const databasesCodes = fs.readdirSync(Directories.getDatabasesDir());

    const inputPromises = databasesCodes.map(async (databaseCode: string) => {
        console.log('load input database', databaseCode);
        return createConnection(getInputConnectionOptions(databaseCode))
            .then(connection => {
                // here you can start to work with your entities
                Databases[databaseCode] = connection;
                return connection;
            })
            .catch(error => {
                throw error;
            });
    });

    const outputPromise = createConnection(getOutputConnectionOptions()).then(connection => {
        Databases.output = connection;
        return connection;
    });

    return Promise.all([...inputPromises, outputPromise]);
};

const getInputConnectionOptions = (code: string): ConnectionOptions => {
    const options: ConnectionOptions = {
        type: 'mysql',
        host: process.env[`DB_INPUT_${code.toUpperCase()}_HOSTNAME`],
        port: 3306,
        username: process.env[`DB_INPUT_${code.toUpperCase()}_USERNAME`],
        password: process.env[`DB_INPUT_${code.toUpperCase()}_PASSWORD`],
        database: process.env[`DB_INPUT_${code.toUpperCase()}_DATABASE`],
        entities: Directories.getInputDatabaseEntitiesFiles(code),
        synchronize: false,
        logging: false,
    };

    // console.log(options);

    return options;
};

const getOutputConnectionOptions = (): ConnectionOptions => {
    const options: ConnectionOptions = {
        type: 'mysql',
        host: process.env[`DB_OUTPUT_HOSTNAME`],
        port: 3306,
        username: process.env[`DB_OUTPUT_USERNAME`],
        password: process.env[`DB_OUTPUT_PASSWORD`],
        database: process.env[`DB_OUTPUT_DATABASE`],
        entities: Directories.getOutputDatabaseEntitiesFiles(),
        synchronize: true,
        logging: false,
    };

    // console.log(options);

    return options;
};
