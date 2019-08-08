import * as LoadJsonFile from 'load-json-file';
import { Directories } from '../utils/directories';

const defaultConfigPath = `${Directories.getRootDir()}/config/config.json`;

interface IDefaultConfig {
    [key: string]: any
}

export class DefaultConfigLoader {
    private config: IDefaultConfig = {};

    constructor() {
        console.log('| load config :', Directories.getRootDir());
        try {
            this.load();
        } catch (e) {
            console.error('[ERROR] cannot load config/config.json. Abort');
            throw e;
        }

    }

    public getConfig(): IDefaultConfig {
        return this.config;
    }

    private load() {
        this.config = LoadJsonFile.sync(defaultConfigPath);
    }
}
