import { Entity, EntityOptions } from 'typeorm';
import { getEntityDatabaseCode } from '../utils/databases';

export function InputEntity(options?: EntityOptions): Function;
export function InputEntity(name?: string, options?: EntityOptions): Function;


export function InputEntity(nameOrOptions?: string|EntityOptions, maybeOptions?: EntityOptions) {
    return function <T extends { new(...args: any[]): {} }>(initialClass: T) {
        let entityDecorator;
        if(typeof nameOrOptions === "string") {
            entityDecorator = Entity(nameOrOptions, maybeOptions);
        } else {
            entityDecorator = Entity(nameOrOptions);
        }
        initialClass.prototype.getDatabaseCode = function () {
            return getEntityDatabaseCode(initialClass);
        };

        return entityDecorator(initialClass);
    }
}
