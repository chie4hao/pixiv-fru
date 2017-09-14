/* eslint no-underscore-dangle: 0 */

import Queue from './queue';

class RetryRequestQueue extends Queue {
  constructor(task, concurrency, retryCount, retryMessage, retryTimeout) {
    super(concurrency);
    this.task = task;
    this._retryCount = retryCount;
    this._retryMessage = retryMessage;
    this._retryTimeout = retryTimeout;
  }

  get retryCount() {
    return this._retryCount;
  }

  set retryCount(retryCount) {
    this._retryCount = retryCount;
    this.process();
  }

  get retryTimeout() {
    return this._retryTimeout;
  }

  set retryTimeout(retryTimeout) {
    this._retryTimeout = retryTimeout;
    this.process();
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
        console.warn(e.message);
      }
    }
    throw new Error(`${args[1]} timeOut retry ${this._retryCount} times`);
  }
}

export default RetryRequestQueue;
