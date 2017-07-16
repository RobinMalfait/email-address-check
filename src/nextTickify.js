export default function nextTickify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      process.nextTick(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    });
  };
}
