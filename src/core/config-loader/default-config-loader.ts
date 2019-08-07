import { Directories } from '../utils/directories';
const loadJsonFile = require('load-json-file');
const defaultConfigPath = `${Directories.getRootDir()}/config/config.json`;

interface IDefaultConfig {[key: string]: any}

export class DefaultConfigLoader {
    private config: IDefaultConfig = {};

    constructor() {
        console.log('| load config :', Directories.getRootDir());
        try {
            this.load();
        } catch(e) {
            console.error('[ERROR] cannot load config/config.json. Abort');
            throw e;
        }

    }

    private load() {
        this.config = loadJsonFile.sync(defaultConfigPath);
    }

    getConfig(): IDefaultConfig {
        return this.config;
    }
}
