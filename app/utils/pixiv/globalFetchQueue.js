import fs from 'fs';
import nodeFetch from 'node-fetch';
import RetryRequestQueue from './requestQueue';
import promisify from './promisify';
import { getState } from '../../store';

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
    return '成功';
  }
  return '已存在';
};
const downloadSettings = getState().main.settings.downloadSettings;

const htmlFetchQueue = new RetryRequestQueue(htmlFetchText, downloadSettings.HtmlGetCount, downloadSettings.htmlGetRetransmissionCount, ['network timeout at', 'failed, reason:', 'Response timeout while trying to fetch'], downloadSettings.htmlGetTimeout);
const originalFetchQueue = new RetryRequestQueue(originalFetchText, downloadSettings.OriginalGetCount, downloadSettings.originalOneRetransmissionCount, ['network timeout at', 'failed, reason:', 'The Originalfile is incomplete'], downloadSettings.originalOneGetTimeOut);

export { htmlFetchQueue, originalFetchQueue };
