import { queryUserRegister } from "../queries";

document.querySelector('#register-form').addEventListener('submit', () => userRegister());

const userRegister = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;

  const payload = {
    data : {
      email: `${email}`,
      password: `${password}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`}
  }

  queryUserRegister(payload)
    .then((response) => {
      console.log(response.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

