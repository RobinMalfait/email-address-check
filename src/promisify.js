export default function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, ...result) => {
        if (err) {
          return reject(err);
        }

        if (result.length > 1) {
          return resolve([...result]);
        }

        return resolve(...result);
      });
    });
  };
}
