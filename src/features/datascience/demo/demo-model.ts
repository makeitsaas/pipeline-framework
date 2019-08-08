import { inputDatabase } from '../../../core/decorators';
import { Connection, ObjectType } from 'typeorm';
import { getEntityDatabaseConnection } from '../../../core/utils/databases';

export class DemoModel {

    private model: number;

    @inputDatabase('test')
    testDb: Connection;

    constructor(private entity: ObjectType<any>) {
    }

    async train() {
        let connection = getEntityDatabaseConnection(this.entity);
        const results = await connection.getRepository(this.entity).find();
        if(results.length) {
            console.log(results[0].getDatabaseCode());
        }
        this.model = results.length;
    }

    async predict() {
        return this.model;
    }
}
