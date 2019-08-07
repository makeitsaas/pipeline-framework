const fs = require('fs');

export const Directories = {
    getRootDir() {
        return process.cwd();
    },
    getDatabasesDir() {
        return `${this.getRootDir()}/src/inputs`;
    },
    getDatabaseEntitiesFiles(code: string) {
        const entitiesDir = `${this.getDatabasesDir()}/${code}/entities`;
        try {
            const files = fs.readdirSync(entitiesDir);
            return files.map((file: string) => `${entitiesDir}/${file}`);
        } catch(e) {
            console.error('Cannot read entities directory');
            throw e;
        }
    }
};
