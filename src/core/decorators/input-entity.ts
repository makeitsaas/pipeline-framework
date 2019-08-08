import { Entity, EntityOptions } from 'typeorm';
import { getEntityDatabaseCode } from '../utils/databases';

export function InputEntity(options?: EntityOptions): (...args: any[]) => void;
export function InputEntity(name?: string, options?: EntityOptions): (...args: any[]) => void;


export function InputEntity(nameOrOptions?: string | EntityOptions, maybeOptions?: EntityOptions) {
    return <T extends new(...args: any[]) => {}>(initialClass: T) => {
        let entityDecorator;
        if (typeof nameOrOptions === "string") {
            entityDecorator = Entity(nameOrOptions, maybeOptions);
        } else {
            entityDecorator = Entity(nameOrOptions);
        }
        initialClass.prototype.getDatabaseCode = () => {
            return getEntityDatabaseCode(initialClass);
        };

        return entityDecorator(initialClass);
    }
}
