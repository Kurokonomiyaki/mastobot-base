import { makeAutorunQueue, makeAutorunThrottledQueue } from '../src/queue';
import { delayExecution } from '../src';

test('test autorun queue', async () => {
  const queue = makeAutorunQueue(100);

  const results = [];
  queue(() => results.push(1));
  queue(() => delayExecution(() => results.push(2), 200));
  queue(() => delayExecution(() => results.push(3), 100));
  queue(() => results.push(4));

  await delayExecution(() => {}, 1000);

  expect(results).toEqual([1, 2, 3, 4]);
});

test('test autorun throttled queue', async () => {
  const queue = makeAutorunThrottledQueue(100);

  const results = [];
  queue(() => results.push(1));
  queue(() => results.push(2));
  expect(results).toEqual([1]);

  await delayExecution(() => {}, 200);
  expect(results).toEqual([1, 2]);

  queue(() => results.push(3));
  expect(results).toEqual([1, 2, 3]);

  queue(() => delayExecution(() => results.push(4), 200));
  expect(results).toEqual([1, 2, 3]);

  queue(() => results.push(5));
  expect(results).toEqual([1, 2, 3]);

  await delayExecution(() => {}, 400);
  expect(results).toEqual([1, 2, 3, 5, 4]);
});
