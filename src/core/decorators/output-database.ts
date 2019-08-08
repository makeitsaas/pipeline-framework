import { CoreContainer } from '../core';

export function outputDatabase(code?: string) {
    return function (target: Object, propertyName: string, index?: number) {
        CoreContainer.onReady().then(() => {
            const database = CoreContainer.getDatabase(code || 'output');
            Object.defineProperty(target, propertyName, {
                value: database
            });
        })
    }
}
