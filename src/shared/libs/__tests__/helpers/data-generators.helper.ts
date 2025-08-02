export const TestDataHelpers = {
  generateId: (prefix: string = "test") =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  generateEmail: (username?: string) => {
    const user = username || `user${Math.random().toString(36).substr(2, 5)}`;
    return `${user}@example.com`;
  },

  generateUsername: () => `user${Math.random().toString(36).substr(2, 8)}`,

  generateTimestamp: (offsetMs: number = 0) => Date.now() + offsetMs,

  createArray: <T>(length: number, factory: (index: number) => T): T[] => {
    return Array.from({ length }, (_, index) => factory(index));
  },
};
