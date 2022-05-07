
document.querySelector('#logout').addEventListener('click', () => userLogout());

const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}
