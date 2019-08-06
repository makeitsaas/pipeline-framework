import { Pipeline } from '../src';

test('Pipeline can run', () => {
    const pipe = new Pipeline();
    expect(pipe.run()).toBe(true);
});
