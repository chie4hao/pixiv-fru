const fs = require('fs');
const nodeFetch = require('node-fetch');

const config = require('./config');
const retryRequestQueue = require('./requestQueue');
const promisify = require('./promisify');

const htmlFetchText = async (url, options) => (await nodeFetch(url, options)).text();

const originalFetchText = async (url, options, filepath) => {
  if (!await promisify(fs.exists)(filepath)) {
    const res = await nodeFetch(url, options);
    const originalLength = res.headers.get('content-length');
    const dest = fs.createWriteStream(filepath, { encoding: 'base64' });
    res.body.pipe(dest);

    // A simple way to confirm the request is resolved, I use 'await res.buffer();'
    // before, but I think it will save the hole file in a array buffer,
    // then I use 'res.body.on('end', ... ) instead, and more bug bug bug, so......

    await new Promise(resolve => dest.on('close', () => { resolve(); }));
    const stat = fs.statSync(filepath);
    if (stat.size < originalLength) {
      await promisify(fs.unlink)(filepath);
      throw new Error(`${filepath} The Originalfile is incomplete`);
    }
    return `${filepath} 成功`;
  }
  return `${filepath} 已存在`;
};

const htmlFetchQueue = retryRequestQueue(htmlFetchText)(config.HtmlGetCount, config.htmlGetRetransmissionCount, ['network timeout at', 'failed, reason:', 'Response timeout while trying to fetch'], config.htmlGetTimeout);
const originalFetchQueue = retryRequestQueue(originalFetchText)(config.OriginalGetCount, config.originalOneRetransmissionCount, ['network timeout at', 'failed, reason:', 'The Originalfile is incomplete'], config.originalOneGetTimeOut);

// There is only one instance
function htmlFetch() {
  return htmlFetchQueue;
}

function originalFetch() {
  return originalFetchQueue;
}

module.exports = { htmlFetch, originalFetch };
