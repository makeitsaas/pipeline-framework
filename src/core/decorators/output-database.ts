import { Core } from '../core';

export function outputDatabase(code?: string) {
    return function (target: Object, propertyName: string, index?: number) {
        Core.onReady().then(() => {
            const database = Core.getDatabase(code || 'output');
            Object.defineProperty(target, propertyName, {
                value: database
            });
        })
    }
}
