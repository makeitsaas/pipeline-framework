import { Core } from '../core';

export function inputDatabase(code: string) {
    return function (target: Object, propertyName: string, index?: number) {
        Core.onReady().then(() => {
            const database = Core.getDatabase(code);
            Object.defineProperty(target, propertyName, {
                value: database
            });
        })
    }
}
