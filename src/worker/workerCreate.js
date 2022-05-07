import {
  queryWorkerCancelRegisterMode,
  queryWorkerCreate,
  queryWorkerGetFingerprintData,
  queryWorkerGetRfidData
} from "./queries";
import pkg from 'lodash';
const { get } = pkg;

document.querySelector('#worker-create-form').addEventListener('submit', (e) => workerCreateSubmit(e));

const workerCreateSubmit = (e) => {
  e.preventDefault();

  const photo = document.querySelector('#uploadImage').files[0];
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const rfid = document.querySelector('#rfid').value;
  const fingerprintId = document.querySelector('#fingerprint').value;

  console.log(photo)

  const payload = {
    data: {
      photo: photo,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      rfid: `${rfid}`,
      fingerprintId: `${fingerprintId}`
    }
  }

  queryWorkerCreate(payload)
    .then((data) => {
      queryWorkerCancelRegisterMode()
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.log(error);
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

document.querySelector('#cancel').addEventListener('click', () => workerCreateCancel());

const workerCreateCancel = () => {

  queryWorkerCancelRegisterMode()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error);
    });

  document.location='workerlist.html';
}

document.querySelector('#getRfid').addEventListener('click', () => getRfid());

const getRfid = () => {
  queryWorkerGetRfidData()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector('#getFingerprint').addEventListener('click', () => getFingerprintId());

const getFingerprintId = () => {
  queryWorkerGetFingerprintData()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

