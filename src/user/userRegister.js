import { queryUserRegister } from "./queries";

document.querySelector('#register-form').addEventListener('submit', (e) => userRegister(e));

const userRegister = (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;

  const payload = {
    data : {
      email: `${email}`,
      password: `${password}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`
    }
  }

  queryUserRegister(payload)
    .then((data) => {
      if (data.success) {
        document.location = 'loginPage.html'
        console.log(data.message);
      }
      else {
        document.location = 'index.html'
        console.log(data.response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

