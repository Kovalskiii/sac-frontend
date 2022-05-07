import axios from "axios";
import pkg from 'lodash';
const { get } = pkg;

export let server = 'https://sac-back-end.herokuapp.com';

function getHeaders(type) {
  const token = localStorage.getItem('token');

  return {
    Authorization: token || '',
    'Content-Type': type || 'application/json',
  };
}

const successHandler = (res) => {
  // const messageTitle = get(res, 'data.message');
  // const messageDescription = get(res, 'data.message');
  // const show = get(res, 'data.show', false);
  //
  // if (show) {
  //   notification.success({
  //     message: messageTitle,
  //     description: messageDescription,
  //     duration: 1,
  //   });
  // }
};

const failHandler = (res) => {
  // const messageTitle = get(res, 'response.data.message', '');
  // const isFail = get(res, 'response.data.fail', true);
  // const statusCode = get(res, 'response.status', '');
  // const statusText = get(res, 'response.statusText', '');
  // const show = get(res, 'response.data.show', true);
  //
  // if (statusCode === 500) {
  //   notification.error({
  //     key: messageTitle,
  //     message: statusText,
  //     duration: 10,
  //   });
  // }
  //
  // if (show && isFail && messageTitle) {
  //   notification.error({
  //     key: messageTitle,
  //     message: messageTitle,
  //     duration: 0,
  //   });
  // } else {
  //   console.log(res);
  // }
};


function httpMethod({ method, url, data, type=''}) {
  return axios({
    method,
    url: server + url,
    data,
    headers: getHeaders(type),
  })
    .then((res) => {
      successHandler(res);
      return res.data;
    })
    .catch((error) => {
      failHandler(error);
      return error;
    });
}

export function Get({ url, data }) {
  return httpMethod({ method: 'get', url, data });
}

export function Post({ url, data, type }) {
  return httpMethod({ method: 'post', url, data, type });
}

export function Patch({ url, data, type }) {
  return httpMethod({ method: 'patch', url, data, type });
}

export function Del({ url, data }) {
  return httpMethod({ method: 'delete', url, data });
}
