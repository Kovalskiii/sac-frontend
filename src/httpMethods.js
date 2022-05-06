import axios from "axios";
import pkg from 'lodash';
const { getData } = pkg;

export let server = 'https://sac-back-end.herokuapp.com';

function getHeaders(type) {
  const token = localStorage.getItem('token');

  return {
    Authorization: token || '',
    'Content-Type': type || 'application/json',
  };
}

const successHandler = (res) => {
  // const messageTitle = getData(res, 'data.message');
  // const messageDescription = getData(res, 'data.message');
  // const show = getData(res, 'data.show', false);
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
  // const messageTitle = getData(res, 'response.data.message', '');
  // const isFail = getData(res, 'response.data.fail', true);
  // const statusCode = getData(res, 'response.status', '');
  // const statusText = getData(res, 'response.statusText', '');
  // const show = getData(res, 'response.data.show', true);
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


function httpMethod({ method, url, data, type = '' }) {
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

export function get({ url, data }) {
  return httpMethod({ method: 'get', url, data });
}

export function post({ url, data, type }) {
  return httpMethod({ method: 'post', url, data, type });
}

export function patch({ url, data, type }) {
  return httpMethod({ method: 'patch', url, data, type });
}

export function del({ url, data }) {
  return httpMethod({ method: 'delete', url, data });
}
