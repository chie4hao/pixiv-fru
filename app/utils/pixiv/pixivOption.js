/**
 * Created by chie on 2016/5/5.
 */

import { getState } from '../../store';
import HttpsProxyAgent from 'https-proxy-agent';

function RequestOptions(method, referer) {
  let PHPSESSID = getState().main.settings.downloadSettings.PHPSESSID;
  if (PHPSESSID === '') PHPSESSID = getState().main.login.PHPSESSID;

  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
    'cache-control': 'max-age=0',
    connection: 'keep-alive',

    Cookie: `PHPSESSID=${PHPSESSID}; p_ab_id=7; p_ab_id_2=9;`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
  };
  headers.Referer = referer;
  this.method = method;
  this.headers = RequestHeaders(headers);
  this.agent = new HttpsProxyAgent('http://127.0.0.1:2313');
}

function RequestHeaders(b) {
  return Object.assign({}, b, {});
}

export default RequestOptions;
