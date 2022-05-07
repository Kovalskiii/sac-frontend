import { queryUserLogin } from "./queries";
import pkg from 'lodash';
const { getData } = pkg;

document.querySelector('#login').addEventListener('submit', async () => await userLogin());

const userLogin = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const payload = {
    data: {
      email: `${email}`,
      password: `${password}`
    }
  }
  queryUserLogin(payload)
    .then((data) => {

      const userId = getData(data, 'userId', '');
      const token = getData(data, 'token', '');
      const name = getData(data, 'name', '');

      if (name && token && userId && data.success) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        document.location='dashboard.html';
      }
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

