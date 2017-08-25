const Queue = require('./queue');

const retryRequestQueue = fun => (concurrency, retryCount, retryMessage, retryTimeout) => {
  const q = Queue(concurrency);

  if (!Array.isArray(retryMessage)) {
    retryMessage = [retryMessage];
  }

  const req = async (url, options, ...args) => {
    for (let i = 0; i < retryCount; i += 1) {
      try {
        if (retryTimeout) {
          options.timeout = retryTimeout;
        }
        return q.push(fun, url, options, ...args);
      } catch (e) {
        if (retryMessage.every(a => e.message.indexOf(a) === -1)) {
          throw e;
        }
        console.warn(e.message);
      }
    }
    throw new Error(`${url} timeOut retry ${retryCount} times`);
  };
  return req;
};

module.exports = retryRequestQueue;
