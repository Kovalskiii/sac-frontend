import {
  queryWorkerCancelRegisterMode,
  queryWorkerGetFingerprintData,
  queryWorkerGetRfidData,
  queryWorkerUpdateById
} from "./queries";
import pkg from 'lodash';
const { get } = pkg;

document.addEventListener("DOMContentLoaded", () => getWorkersData());
let workerData = {};

const getWorkersData = () => {
  workerData.firstName = localStorage.getItem('firstName');
  workerData.lastName = localStorage.getItem('lastName');
  workerData.rfid = localStorage.getItem('rfid');
  workerData.fingerprintId = localStorage.getItem('fingerprintId');
  workerData.workerId = localStorage.getItem('workerId');

  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('rfid');
  localStorage.removeItem('fingerprintId');
  localStorage.removeItem('workerId');

  document.querySelector('#firstName').value = workerData.firstName;
  document.querySelector('#lastName').value = workerData.lastName;
  document.querySelector('#rfid').value = workerData.rfid;
  document.querySelector('#fingerprint').value = workerData.fingerprintId;
}

document.querySelector('#worker-update-form').addEventListener('submit', (e) => workerUpdateSubmit(e));

const workerUpdateSubmit = (e) => {
  e.preventDefault();

  const photo = document.querySelector('#uploadImage').files[0];
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const rfid = document.querySelector('#rfid').value;
  const fingerprintId = document.querySelector('#fingerprint').value;

  const payload = {
    workerId: `${workerData.workerId}`,
    data: {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      rfid: `${rfid}`,
      fingerprintId: `${fingerprintId}`
    }
  }
  if (photo) {
    payload.data.photo = photo;
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
      if (data.success) {
        alert(data.message);
        console.log(data.message);
        document.location = 'workerlist.html'
      }
      else {
        alert(data.response.data.message);
        console.log(data.response.data.message);
        document.location = 'workerlist.html'
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector('#cancel').addEventListener('click', () => workerUpdateCancel());

const workerUpdateCancel = () => {
  queryWorkerCancelRegisterMode()
    .then((data) => {
      console.log(data.message);
      document.location='workerlist.html';
    })
    .catch((error) => {
      console.log(error);
      document.location='workerlist.html';
    });
}

document.querySelector('#getRfid').addEventListener('click', () => getRfid());

const getRfid = () => {
  queryWorkerGetRfidData()
    .then((data) => {
      if (data.payload.rfid !== undefined) {
        document.querySelector('#rfid').value = data.payload.rfid;
      }
      else {
        document.querySelector('#rfid').value = null;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector('#getFingerprint').addEventListener('click', () => getFingerprintId());

const getFingerprintId = () => {
  queryWorkerGetFingerprintData()
    .then((data) => {
      if (data.payload.fingerprintId !== undefined) {
        document.querySelector('#fingerprint').value = data.payload.fingerprintId;
      }
      else {
        document.querySelector('#fingerprint').value = null;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
