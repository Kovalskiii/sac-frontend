import {
  queryWorkerDeleteById,
  queryWorkerSearchByName,
  queryWorkerSetRegisterMode
} from "./queries";
import pkg from 'lodash';
import { getWorkersList, workerListItem } from "./workerGetAllList";
const { get } = pkg;

document.querySelector('#addWorkerBtn').addEventListener('click', () => workerAdd());

const workerAdd = async () => {
  await queryWorkerSetRegisterMode()
    .then((data) => {
      document.location='workerCreate.html';
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

document.querySelector('input[type="search"]').addEventListener('input', (event) => workerSearch(event));

const workerSearch = async (event) => {
  const name = document.querySelector('#searchInput').value;

  const payload = {
    data: {
      name: `${name}`,
    }
  }

  if (event.target.value.length) {
    await queryWorkerSearchByName(payload)
      .then((data) => {
        console.log(data.payload)
        const workerInfoArr = data.payload;
        const workersListContainer = document.querySelector('.workers-list-container');
        //
        if (workerInfoArr) {
          workerListItem(workerInfoArr, workersListContainer);
        }
        else {
          console.log(data.response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    getWorkersList();
  }
}

export const workerUpdate = async (workerData) => {
  //
  await queryWorkerSetRegisterMode()
    .then((data) => {
      if (data.success) {
        localStorage.setItem('firstName', workerData.firstName);
        localStorage.setItem('lastName', workerData.lastName);
        localStorage.setItem('rfid', workerData.rfid);
        localStorage.setItem('fingerprintId', workerData.fingerprintId);
        localStorage.setItem('workerId', workerData.workerId);

        document.location='workerUpdate.html';
      }
      else {
        console.log(data.response.data.message);
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

export const workerDelete = async (workerId) => {
  //
  const payload = {
    workerId: `${workerId}`,
  }

  await queryWorkerDeleteById(payload)
    .then((data) => {
      if (data.success) {
        alert(data.message);
        console.log(data.message);
        getWorkersList();
        document.querySelector('input[type="search"]').value = '';
      }
      else {
        alert(data.response.data.message);
        console.log(data.response.data.message);
        getWorkersList();
        document.querySelector('input[type="search"]').value = '';
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

