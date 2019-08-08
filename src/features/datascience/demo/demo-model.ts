import { Connection, ObjectType } from 'typeorm';
import { getEntityDatabaseConnection } from '../../../core/utils/databases';

export class DemoModel {
    private model: number;

    constructor(private entity: ObjectType<any>) {}

    public async train() {
        const connection: Connection = getEntityDatabaseConnection(this.entity);
        const results = await connection.getRepository(this.entity).find();
        if (results.length) {
            console.log(results[0].getDatabaseCode());
        }
        this.model = results.length;
    }

    public async predict() {
        return this.model;
    }
}
