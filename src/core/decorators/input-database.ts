import { CoreContainer } from '../core';

export function inputDatabase(code: string) {
    return (target: object, propertyName: string, index?: number) => {
        CoreContainer.onReady().then(() => {
            const database = CoreContainer.getDatabase(code);
            Object.defineProperty(target, propertyName, {
                value: database,
            });
        });
    };
}
