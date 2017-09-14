// <a href="/logout.php?return_to=%2F" data-text-confirm="您確定要退出賬號嗎？" onclick="return confirm(this.getAttribute('data-text-confirm'))" class="item header-logout">退出賬號</a>

import nodeFetch from 'node-fetch';
import $ from 'cheerio';
import FormData from 'form-data';
import { parse } from 'querystring';

let PHPSESSID = '';
const submitForm = {};
submitForm.ref = 'wwwtop_accounts_index';
submitForm.g_recaptcha_response = '';

function RequestOptions(method, referer, RequestPHPSESSID) {
  this.headers = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
    'cache-control': 'max-age=0',
    connection: 'keep-alive',

    // 'Content-Length': 206,
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    referer,
    cookie: RequestPHPSESSID !== undefined ? `PHPSESSID=${RequestPHPSESSID}` : '',
    host: 'accounts.pixiv.net',
    origin: 'https://accounts.pixiv.net',
    'x-requested-with': 'XMLHttpRequest'
  };
  this.method = method;
}

function CaptchaRequestOptions(method, referer, RequestPHPSESSID) {
  this.headers = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
    connection: 'keep-alive',

    // 'Content-Length': '206',
    // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    cookie: RequestPHPSESSID !== undefined ? `PHPSESSID=${RequestPHPSESSID}` : '',
    host: 'accounts.pixiv.net',
    origin: 'https://accounts.pixiv.net',
    referer,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  };
  this.method = method;
}

// function CaptchaOptions(method, referer, RequestPHPSESSID) {
//   this.headers = {
//     accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
//     connection: 'keep-alive',

//     cookie: RequestPHPSESSID !== undefined ? `PHPSESSID=${RequestPHPSESSID}; p_ab_id=7; p_ab_id_2=9; __utmt=1; __utma=235335808.1916253446.1504449796.1504449796.1504449796.1; __utmb=235335808.1.10.1504449796; __utmc=235335808; __utmz=235335808.1504449796.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=235335808.|2=login%20ever=no=1^9=p_ab_id=7=1^10=p_ab_id_2=9=1^11=lang=zh=1; login_bc=1; _ga=GA1.2.1916253446.1504449796; _gid=GA1.2.151546041.1504449799; _ga=GA1.3.1916253446.1504449796; _gid=GA1.3.151546041.1504449799; _gat=1` : '',
//     host: 'accounts.pixiv.net',
//     referer,
//     origin: 'https://accounts.pixiv.net',
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
//   };
//   this.method = method;
// }

async function login(pixivId, password) {
  const form = new FormData();

  const baseUrl = 'https://accounts.pixiv.net/login?lang=zh&source=pc&view_type=page&ref=wwwtop_accounts_index';
  const res = await nodeFetch(baseUrl, new RequestOptions('GET', 'https://www.pixiv.net', PHPSESSID === '' ? undefined : PHPSESSID));
  const loginPage = $.load(await res.text());

  const loginPagePHPSESSID = parse(res.headers.get('set-cookie'), ';').PHPSESSID;
  if (loginPagePHPSESSID !== undefined) PHPSESSID = loginPagePHPSESSID;

  Array.from(loginPage('form input')).forEach(({ attribs }) => {
    if (attribs.value !== undefined) {
      submitForm[attribs.name] = attribs.value;
    }
  });
  console.log(PHPSESSID);
  submitForm.pixiv_id = pixivId;
  submitForm.password = password;
  submitForm.captcha = '';

  Object.entries(submitForm).forEach(a => {
    if (a[0] !== 'lang') {
      console.log(a[0], a[1]);
      form.append(a[0], a[1]);
    }
  });

  const loginRes = await nodeFetch('https://accounts.pixiv.net/api/login?lang=zh',
  { method: 'POST', body: form, headers: (new CaptchaRequestOptions('POST', baseUrl, PHPSESSID)).headers });
  // console.log(loginRes);
  const loginResJson = await loginRes.json();
  const json = JSON.stringify(loginResJson);
  console.log(json);
  const loginResPHPSESSID = parse(loginRes.headers.get('set-cookie'), ';').PHPSESSID;
  if (loginResPHPSESSID !== undefined) PHPSESSID = loginResPHPSESSID;

  // {"error":false,"message":"","body":{"success":{"return_to":"https://www.pixiv.net/"}}}
  if (json.indexOf('success') !== -1) {
    return PHPSESSID;
  }
  // {"error":false,"message":"","body":{"validation_errors":{"pixiv_id":"请确认您所输入的pixiv ID,电邮以及密码是否正确。"}}}
  // {"error":false,"message":"","body":{"validation_errors":{"password":"密码为6～72文字以内"}}}
  if (json.indexOf('请确认您所输入的pixiv ID,电邮以及密码是否正确') !== -1 || json.indexOf('密码为6～72文字以内') !== -1) {
    throw new Error(`login Error: ${loginResJson.body.validation_errors}`);
  }

  // {"error":false,"message":"","body":{"validation_errors":{"captcha":"请输入正确的pixiv ID或邮箱地址以及密码后进行验证"}}} 后请求captcha
  if (json.indexOf('请输入正确的pixiv ID或邮箱地址以及密码后进行验证') !== -1) {
    // delete captcha login
    throw new Error(`login Error: ${loginResJson.body.validation_errors.captcha}, 暂不支持验证码登录, 请稍后登录`);
    /*
    const captchaRes = await fetch('https://accounts.pixiv.net/captcha', new CaptchaOptions('GET', baseUrl, PHPSESSID));
    const captchaBlob = await captchaRes.blob();

    window.dispatch({
      type: 'main/login/objectChange',
      obj: {
        captchaOpen: true,
        captchaSrc: URL.createObjectURL(captchaBlob)
      }
    });
    console.log(captchaRes);
    return 0; */
    /* console.log(captchaRes.headers);
    const dest = fs.createWriteStream('./octocat.png');

    captchaRes.body.pipe(dest);
    await new Promise(resolve => dest.on('close', () => { resolve(); }));
    return 0; */
  }
  // {"error":false,"message":"","body":{"validation_errors":{"captcha":"请输入正确的pixiv ID或邮箱地址以及密码后进行验证",
  // "lock": "您的帐号因为输入过多错误资料而被封锁了。请稍微等候然后再尝试登录。"}}}
  throw new Error(`Unknown Login Error: ${json}`);
}

export default async function pixivLogin(username, password, captcha) {
  const a = await login(username, password, captcha);
  return a;
}
