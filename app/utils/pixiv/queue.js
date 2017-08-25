function Queue(concurrency) {
  let workers = 0;
  const workersList = [];
  const taskQueue = [];
  const addTask = (res, rej, task, ...args) => {
    const process = () => {
      if (workers < q.concurrency && taskQueue.length) {
        const tasks = taskQueue.shift();
        workers += 1;
        workersList.push(tasks);
        const cb = () => {
          workers -= 1;
          if (workersList.every((worker, index) => {
            if (worker === tasks) {
              workersList.splice(index, 1);
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
          process();
          return 0;
        }).catch((e) => {
          cb();
          tasks.rej(e);
          process();
        });
      }
    };
    taskQueue.push({ res, rej, task, args });
    process();
  };

  const q = {
    concurrency,
    push: (...arg) => new Promise((resolve, reject) => {
      try {
        addTask((arg1) => {
          resolve(arg1);
        },
        (e) => {
          reject(e);
        },
         ...arg);
      } catch (e) {
        reject(e);
      }
    })
  };
  return q;
}

module.exports = Queue;
/*
const timeOut = (time, text) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(text);
  }, time);
});

let Q = Queue(4);
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
Q.push(timeOut, 1000, 1234).then(a => console.log(a));
*/
