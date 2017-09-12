/* eslint no-underscore-dangle: 0 */

const Queue = require('./queue');

class RetryRequestQueue extends Queue {
  constructor(task, concurrency, retryCount, retryMessage, retryTimeout) {
    super(concurrency);
    this.task = task;
    this._retryCount = retryCount;
    this._retryMessage = retryMessage;
    this._retryTimeout = retryTimeout;
  }

  async push(...args) {
    for (let i = 0; i < this._retryCount; i += 1) {
      try {
        args[1].timeout = this._retryTimeout;
        return super.push(this.task, ...args);
      } catch (e) {
        if (this._retryMessage.every(a => e.message.indexOf(a) === -1)) {
          throw e;
        }
        console.log(e.message);
      }
    }
    throw new Error(`${args[1]} timeOut retry ${this._retryCount} times`);
  }
}

module.exports = RetryRequestQueue;
