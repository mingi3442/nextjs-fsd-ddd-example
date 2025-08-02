export const AsyncTestHelpers = {
  delay: (ms: number = 100) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  wrapPromise: <T>(value: T, delay: number = 0): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), delay);
    });
  },

  wrapError: (error: Error, delay: number = 0): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(error), delay);
    });
  },
};
