import {
  queryWorkerCancelRegisterMode,
  queryWorkerGetFingerprintData,
  queryWorkerGetRfidData,
  queryWorkerUpdateById
} from "./queries";
import pkg from 'lodash';
const { get } = pkg;

document.querySelector('#worker-update-form').addEventListener('submit', (e) => workerUpdateSubmit(e));

const workerUpdateSubmit = (e) => {
  e.preventDefault();

  const photo = document.querySelector('#uploadImage').files[0];
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const rfid = document.querySelector('#rfid').value;
  const fingerprintId = document.querySelector('#fingerprint').value;

  const workerId = '4G9l5sKuzzVLDq6kIvKs'; //must be get from workers list

  const payload = {
    workerId: `${workerId}`,
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
