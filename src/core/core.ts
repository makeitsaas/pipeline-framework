import { Connection } from 'typeorm';
import { StorageService } from '../features/storage/storage-service';
import { DefaultConfigLoader } from './config-loader/default-config-loader';
import { LoadEnvConfig } from './config-loader/env-config-loader';
import { Databases, loadDatabases } from './databases/databases';

export class CoreClass {
    private defaultConfig: DefaultConfigLoader;
    private ready: Promise<any>;

    constructor() {
        console.log('| load pipeline core');
        LoadEnvConfig();
        this.defaultConfig = new DefaultConfigLoader();
        this.ready = Promise.all([loadDatabases()]);
        this.ready.then(() => {
            StorageService.storeData({});
        });
    }

    public onReady(): Promise<any> {
        return this.ready;
    }

    public getDatabase(code: string): Connection {
        if (!Databases[code]) {
            throw new Error(`Database ${code} does not exist`);
        }
        return Databases[code];
    }
}

export const CoreContainer = new CoreClass();
