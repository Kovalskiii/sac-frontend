import './style.css';
import axios from "axios";

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

// localStorage.setItem('token', token);
// localStorage.setItem('userId', userId);
//const userId = localStorage.getItem('userId');

//when log out
// localStorage.removeItem('token');
// localStorage.removeItem('userId');

document.querySelector('#login').addEventListener('click', () => {
  axios.post('https://sac-back-end.herokuapp.com/user', {
    headers: {
      "Content-type": "application/json",
      //"Authorization": `${token}`,
    },
    email: 'i@mail44.md',
    password: '123123',
    firstName: 'vlad',
    lastName: 'vlad',
  })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
});
