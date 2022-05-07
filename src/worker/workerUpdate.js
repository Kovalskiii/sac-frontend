import { queryWorkerCancelRegisterMode, queryWorkerCreate, queryWorkerUpdateById } from "./queries";
import pkg from 'lodash';
const { getData } = pkg;

document.querySelector('#submit').addEventListener('submit', () => workerUpdateSubmit());

const workerUpdateSubmit = () => {
  const photo = document.querySelector('#photo').value;
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const rfid = document.querySelector('#rfid').value;
  const fingerprint = document.querySelector('#fingerprint').value;

  const workerId = 0; //must be get from workers list

  const payload = {
    workerId: `${workerId}`,
    data: {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      rfid: `${rfid}`,
      fingerprint: `${fingerprint}`
    }
  }
  if (photo) {
    payload.data.photo = `${photo}`;
  }

  queryWorkerUpdateById(payload)
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

document.querySelector('#cancel').addEventListener('click', () => workerUpdateCancel());

const workerUpdateCancel = () => {
  queryWorkerCancelRegisterMode()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });


  document.location='workerlist.html';
}

