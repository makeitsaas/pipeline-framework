import { CoreContainer } from '../core';

export function inputDatabase(code: string) {
    return function (target: Object, propertyName: string, index?: number) {
        CoreContainer.onReady().then(() => {
            const database = CoreContainer.getDatabase(code);
            Object.defineProperty(target, propertyName, {
                value: database
            });
        })
    }
}
