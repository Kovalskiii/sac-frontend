import { queryWorkerCancelRegisterMode, queryWorkerCreate, queryWorkerSetRegisterMode } from "./queries";
import pkg from 'lodash';
const { getData } = pkg;

document.querySelector('#submit').addEventListener('submit', () => workerCreateSubmit());

const workerCreateSubmit = () => {
  const photo = document.querySelector('#photo').value;
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const rfid = document.querySelector('#rfid').value;
  const fingerprint = document.querySelector('#fingerprint').value;

  const payload = {
    data: {
      photo : `${photo}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      rfid: `${rfid}`,
      fingerprint: `${fingerprint}`
    }
  }

  queryWorkerCreate(payload)
    .then((data) => {
      queryWorkerCancelRegisterMode()
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });

  document.location='workerlist.html';
}

document.querySelector('#cancel').addEventListener('click', () => workerCreateCancel());

const workerCreateCancel = () => {

  queryWorkerCancelRegisterMode()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });

  document.location='workerlist.html';
}

