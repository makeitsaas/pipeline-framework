import { DefaultConfigLoader } from './config-loader/default-config-loader';
import { EnvConfigLoader } from './config-loader/env-config-loader';
import { Databases, loadDatabases } from './databases/databases';
import { StorageService } from '../features/storage/storage-service';
import { Connection } from 'typeorm';

export class CoreClass {
    private defaultConfig: DefaultConfigLoader;
    readonly ready: Promise<any>;

    constructor() {
        console.log('| load pipeline core');
        new EnvConfigLoader();
        this.defaultConfig = new DefaultConfigLoader();
        this.ready = Promise.all([loadDatabases()]);
        this.ready.then(() => {
            StorageService.storeData({});
        })
    }

    public onReady(): Promise<any> {
        return this.ready;
    }

    public getDatabase(code: string): Connection {
        if(!Databases[code]) {
            throw new Error(`Database ${code} does not exist`);
        }
        return  Databases[code];
    }
}

export const Core = new CoreClass();
