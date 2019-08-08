import { Pipeline } from '../src/features/pipeline/pipeline';

test('Pipeline can run', () => {
    const pipe = new Pipeline();
    expect(pipe.run()).toBe(true);
});
