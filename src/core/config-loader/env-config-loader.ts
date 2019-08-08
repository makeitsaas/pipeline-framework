import { config } from 'dotenv';

export class EnvConfigLoader {
    constructor() {
        console.log('| load .env');
        try {
            this.load();
        } catch(e) {
            console.error('[ERROR] cannot load .env file. Abort');
            throw e;
        }
    }

    private load() {
        config();
    }
}


export const LoadEnvConfig = () => {
    console.log('| load .env');
    try {
        config();
    } catch(e) {
        console.error('[ERROR] cannot load .env file. Abort');
        throw e;
    }
};
