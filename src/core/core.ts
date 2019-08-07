import { DefaultConfigLoader } from './config-loader/default-config-loader';
import { EnvConfigLoader } from './config-loader/env-config-loader';
import { loadDatabases } from './databases/databases';

export class CoreClass {
    private defaultConfig: DefaultConfigLoader;
    readonly ready: Promise<any>;

    constructor() {
        console.log('| load pipeline core');
        new EnvConfigLoader();
        this.defaultConfig = new DefaultConfigLoader();
        this.ready = Promise.all([loadDatabases()])
    }

    public onReady(): Promise<any> {
        return this.ready;
    }
}

export const Core = new CoreClass();
