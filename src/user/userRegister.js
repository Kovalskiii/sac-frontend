import { queryUserRegister } from "./queries";

document.querySelector('#register-form').addEventListener('submit', async () => await userRegister());

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
      lastName: `${lastName}`
    }
  }

  queryUserRegister(payload)
    .then((data) => {
      if (data.success) {
        document.location='dashboard.html'
      }
      else {
        document.location='index.html'
      }
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

