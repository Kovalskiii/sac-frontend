import { queryUserLogin } from "./queries";
import pkg from 'lodash';
const { get } = pkg;

document.querySelector('#login-form').addEventListener('submit', (e) => userLogin(e));

const userLogin = (e) => {
  e.preventDefault();

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
      const userId = get(data, 'userId', '');
      const token = get(data, 'token', '');
      const name = get(data, 'user.name', '');

      if (name && token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        document.location = 'dashboard.html';
        console.log("Success", data);
        console.log(data.message);
      }
      else {
        document.location = 'loginPage.html';
        console.log(data.response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

