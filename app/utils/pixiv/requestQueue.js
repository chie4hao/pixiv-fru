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

  async asyncTask(insertAtFront, ...args) {
    for (let i = 0; i < this._retryCount; i += 1) {
      try {
        Object.assign(args[1], { timeout: this._retryTimeout });
        // args[1].timeout = this._retryTimeout;
        const result = insertAtFront ? await super.unshift(this.task, ...args)
          : await super.push(this.task, ...args);
        return result;
      } catch (e) {
        if (this._retryMessage.every(a => e.message.indexOf(a) === -1)) {
          return `Error ${e.message}`;
          // throw e;
        }
        console.warn(e.message);
      }
    }
    return `Error retry ${this._retryCount} times`;
  }

  async push(...args) {
    return this.asyncTask(false, ...args);
    /*
    for (let i = 0; i < this._retryCount; i += 1) {
      try {
        Object.assign(args[1], { timeout: this._retryTimeout });
        // args[1].timeout = this._retryTimeout;
        const result = await super.push(this.task, ...args);
        return result;
      } catch (e) {
        if (this._retryMessage.every(a => e.message.indexOf(a) === -1)) {
          return `Error ${e.message}`;
          // throw e;
        }
        console.warn(e.message);
      }
    }
    return `Error retry ${this._retryCount} times`;
    // throw new Error(`${args[1]} timeOut retry ${this._retryCount} times`);
    */
  }

  async unshift(...args) {
    return this.asyncTask(true, ...args);
  }
}

export default RetryRequestQueue;
