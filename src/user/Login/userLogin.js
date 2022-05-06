import { queryUserLogin, queryUserRegister } from "../queries";

document.querySelector('#login-form').addEventListener('submit', () => userLogin());

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
    .then((response) => {
      console.log(response.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

