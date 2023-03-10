import _ from '../assets/utils';
import qs from 'qs';
import { Toast } from 'antd-mobile';

/* 核心方法 */
const http = function http(config) {
  // initial config & validate
  if (!_.isPlainObject(config)) config = {};
  config = Object.assign({
    url: '',
    method: 'GET',
    credentials: 'include',
    headers: null,
    body: null,
    params: null,
    responseType: 'json',
    signal: null
  }, config);
  if (!config.url) throw new TypeError('url must be required');
  if (!_.isPlainObject(config.headers)) config.headers = {};
  if (config.params !== null && !_.isPlainObject(config.params)) config.params = null;

  let { url, method, credentials, headers, body, params, responseType, signal } = config;
  if(method==='get'||method==='GET'){
  if (params) {
    url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`;
  }
  if (_.isPlainObject(body)) {
    body = qs.stringify(body);
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  }
  if(method==='put'||method==='PUT'){
    headers['Content-Type'] = 'multipart/form-data';
  }


  // 处理Token
  let token = _.storage.get('tk'),
    /**
     * 哪些接口需要 token
     * /user/getUserInfo ：获取登录用户信息
     * /front/logout：退出登录
     * /user/updateUserInfo： 修改个人信息
     */
    safeList = ['/user/getUserInfo', '/front/logout',];
  if (token) {
    headers['token'] = token;
    let reg = /\/api(\/[^?#]+)/,
      [, $1] = reg.exec(url) || [];
    let isSafe = safeList.some(item => {
      return $1 === item;
    });
    if (isSafe) headers['token'] = token;
  }

  // send
  method = method.toUpperCase();
  config = {
    method,
    credentials,
    headers,
    cache: 'no-cache',
    signal
  };
  if (/^(POST|PUT|PATCH)$/i.test(method) && body) {
    headers['Content-Type'] = 'application/json';
    if(method==='put'||method==='PUT'){
      headers['Content-Type'] = 'multipart/form-data;charset=utf-8';
    }
    config.body = JSON.stringify(body);
  }
  return fetch(url, config)
    .then(response => {
      let { status, statusText } = response;
      if (/^(2|3)\d{2}$/.test(status)) {
        let result;
        switch (responseType.toLowerCase()) {
          case 'text':
            result = response.text();
            break;
          case 'arraybuffer':
            result = response.arrayBuffer();
            break;
          case 'blob':
            result = response.blob();
            break;
          default:
            result = response.json();
        }
        return result;
      }
      return Promise.reject({
        code: -100,
        status,
        statusText
      });
    })
    .catch(reason => {
      Toast.show({
        icon: 'fail',
        content: '网络繁忙,请稍后再试!'
      });
      return Promise.reject(reason);
    });
};

/* 快捷方法 */
["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
  http[item.toLowerCase()] = function (url, config) {
    if (!_.isPlainObject(config)) config = {};
    config['url'] = url;
    config['method'] = item;
    return http(config);
  };
});
["POST", "PUT", "PATCH"].forEach(item => {
  http[item.toLowerCase()] = function (url, body, config) {
    if (!_.isPlainObject(config)) config = {};
    config['url'] = url;
    config['method'] = item;
    config['body'] = body;
    return http(config);
  };
});

export default http;