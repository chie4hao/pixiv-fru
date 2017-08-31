// <a href="/logout.php?return_to=%2F" data-text-confirm="您確定要退出賬號嗎？" onclick="return confirm(this.getAttribute('data-text-confirm'))" class="item header-logout">退出賬號</a>

const nodeFetch = require('node-fetch');
const $ = require('cheerio');
const FormData = require('form-data');
const { parse } = require('querystring');
const fs = require('fs');

function RequestOptions(method, referer, PHPSESSID) {
  this.headers = {
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    referer,
    Cookie: PHPSESSID !== undefined ? `PHPSESSID=${PHPSESSID}` : undefined
  };
  this.method = method;
}

async function login(pixivId, password, captcha) {
  const form = new FormData();

  const baseUrl = 'https://accounts.pixiv.net/login?lang=zh&source=pc&view_type=page&ref=wwwtop_accounts_index';

  const res = await nodeFetch(baseUrl, new RequestOptions('GET'));
  const loginPage = $.load(await res.text());
  let PHPSESSID = parse(res.headers.get('set-cookie'), ';').PHPSESSID;
  console.log(PHPSESSID);

  form.append('pixiv_id', pixivId);
  form.append('password', password);
  Array.from(loginPage('form input')).forEach(({ attribs }) => {
    if (attribs.value !== undefined) {
      form.append(attribs.name, attribs.value);
    }
  });

  const loginRes = await nodeFetch('https://accounts.pixiv.net/api/login?lang=zh',
  { method: 'POST', body: form, headers: (new RequestOptions('POST', baseUrl, PHPSESSID)).headers });
  // console.log(loginRes);
  const loginResJson = await loginRes.json();
  const json = JSON.stringify(loginResJson);
  console.log(json);
  PHPSESSID = parse(loginRes.headers.get('set-cookie'), ';').PHPSESSID;

  // {"error":false,"message":"","body":{"success":{"return_to":"https://www.pixiv.net/"}}}
  if (json.indexOf('success') !== -1) {
    return PHPSESSID;
  }

  if (json.indexOf('请确认您所输入的pixiv ID,电邮以及密码是否正确') !== -1 || json.indexOf('密码为6～72文字以内') !== -1) {
    return loginResJson.body.validation_errors;
  }

  // {"error":false,"message":"","body":{"validation_errors":{"pixiv_id":"请确认您所输入的pixiv ID,电邮以及密码是否正确。"}}}
  // {"error":false,"message":"","body":{"validation_errors":{"password":"密码为6～72文字以内"}}}
  // {"error":false,"message":"","body":{"validation_errors":{"captcha":"请输入正确的pixiv ID或邮箱地址以及密码后进行验证"}}} 后请求captcha
  if (json.indexOf('请输入正确的pixiv ID或邮箱地址以及密码后进行验证') !== -1) {
    console.log('laskdjf');
    const captchaRes = await fetch('https://accounts.pixiv.net/captcha', new RequestOptions('GET', baseUrl, PHPSESSID));
    console.log(captchaRes.headers);
    const dest = fs.createWriteStream('./octocat.png');

    captchaRes.body.pipe(dest);
    await new Promise(resolve => dest.on('close', () => { resolve(); }));
    return 0;
  }
  // {"error":false,"message":"","body":{"validation_errors":{"captcha":"请输入正确的pixiv ID或邮箱地址以及密码后进行验证",
  // "lock": "您的帐号因为输入过多错误资料而被封锁了。请稍微等候然后再尝试登录。"}}}
  if (!PHPSESSID) throw new Error(`login Error: ${json}`);
  console.log(PHPSESSID);
  return PHPSESSID;
}

export default async function pixivLogin(username, password, captcha) {
  /* const a = await login(username, password);
  return a; */
  const captchaRes = await fetch('https://accounts.pixiv.net/captcha', new RequestOptions('GET', '', '8318723_72ff74884b5684b4eb5518e184aa71de'));
  const captchaBlob = await captchaRes.blob();

  window.dispatch({
    type: 'main/login/objectChange',
    obj: {
      captchaOpen: true,
      captchaSrc: URL.createObjectURL(captchaBlob)
    }
  });
  console.log(captchaRes);
}
