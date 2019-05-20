const makeDelayedFunction = (f, delay = 10000) => {
  let lastTaken = 0;
  return (...args) => {
    const delta = Date.now() - lastTaken;
    if (delta >= 0 && delta < delay) {
      lastTaken = Date.now() + delta;
      setTimeout(() => f(...args), delta);
    } else if (delta < 0) {
      lastTaken += delay;
      setTimeout(() => f(...args), Math.abs(delta));
    } else {
      lastTaken = Date.now();
      f(...args);
    }
  };
};

// create an execution queue that force a delay between executions
// ordering is not guaranteed when promise and async functions are used
export const makeAutorunThrottledQueue = (delay = 10000) => {
  return makeDelayedFunction((f, ...args) => f(...args), delay);
};


// by creating an await loop, we make sure that all promises execution will be ordered
const processQueue = async (queue) => {
  while (queue.length > 0) {
    const { f, args } = queue.shift();
    await f(...args);
  }
};
export const makeAutorunQueue = (delay = 5000) => {
  const queue = [];

  let running = false;
  setInterval(() => {
    if (running === false) {
      running = true;
      processQueue(queue);
    }
  }, delay);

  return (f, ...args) => {
    queue.push({ f, args });
  };
};
