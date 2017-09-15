/* eslint no-underscore-dangle: 0 */
class PromiseQueue {
  constructor(concurrency = 1) {
    this._concurrency = concurrency;
    this.workers = 0;
    this.workersList = [];
    this.taskQueue = [];
    this.paused = false;
  }

  get concurrency() {
    return this._concurrency;
  }

  set concurrency(concurrency) {
    this._concurrency = concurrency;
    this.process();
  }

  insert(res, rej, insertAtFront, task, ...args) {
    if (insertAtFront) {
      this.taskQueue.unshift({ res, rej, task, args });
    } else {
      this.taskQueue.push({ res, rej, task, args });
    }
    this.process();
  }

  process() {
    while (!this.paused && this.workers < this._concurrency && this.taskQueue.length) {
      const tasks = this.taskQueue.shift();
      this.workers += 1;
      this.workersList.push(tasks);

      const cb = () => {
        this.workers -= 1;
        if (this.workersList.every((worker, index) => {
          if (worker === tasks) {
            this.workersList.splice(index, 1);
            return false;
          }
          return true;
        })) {
          throw new Error('fuck big ERROR!');
        }
      };

      tasks.task(...tasks.args).then((arg) => {
        cb();
        tasks.res(arg);
        this.process();
        return 0;
      }).catch((e) => {
        cb();
        tasks.rej(e);
        this.process();
      });
    }
  }

  push(...arg) {
    return new Promise((resolve, reject) => {
      this.insert(arg1 => resolve(arg1), e => reject(e), false, ...arg);
    });
  }

  unshift(...arg) {
    return new Promise((resolve, reject) => {
      this.insert(arg1 => resolve(arg1), e => reject(e), true, ...arg);
    });
  }

  pause() {
    this.paused = true;
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      this.process();
    }
  }
}

export default PromiseQueue;
/*
const timeOut = (time, text) => new Promise((resolve, reject) => {
    throw new Error('sldkflsdj');
  setTimeout(() => {
    reject(text);
  }, time);
});

const Q = new PromiseQueue(4);
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
Q.push(timeOut, 1000, 1234).then(a => console.log(a)).catch(e => console.log(e.message));
*/
