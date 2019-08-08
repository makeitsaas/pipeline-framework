import { ObjectType } from 'typeorm';
import { Databases } from '../..';

export function getEntityDatabaseCode(entity: ObjectType<any>) {
    for (let code in Databases) {
        try {
            Databases[code].getRepository(entity); // error if not found
            return code;
        } catch (e) {}
    }
    throw new Error('Unable to find entity database');
}


export function getEntityDatabaseConnection(entity: ObjectType<any>) {
    let code = getEntityDatabaseCode(entity);

    return Databases[code];
}
