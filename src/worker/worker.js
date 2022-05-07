import {
  queryWorkerDeleteById,
  queryWorkerSearchByName,
  queryWorkerSetRegisterMode
} from "./queries";
import pkg from 'lodash';
const { getData } = pkg;

document.querySelector('#addWorkerBtn').addEventListener('click', () => workerAdd());

const workerAdd = async () => {
  //
  document.location='workerCreate.html';

  await queryWorkerSetRegisterMode()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

document.querySelector('#updateWorkerBtn').addEventListener('click', () => workerUpdate());

const workerUpdate = async () => {
  //
  document.location='workersUpdate.html';

  await queryWorkerSetRegisterMode()
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

document.querySelector('#searchWorker').addEventListener('click', () => workerSearch());

const workerSearch = async () => {
  const name = document.querySelector('#name').value;

  const payload = {
    data: {
      name: `${name}`,
    }
  }

  await queryWorkerSearchByName(payload)
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

document.querySelector('#deleteWorkerBtn').addEventListener('click', () => workerDelete());

const workerDelete = async () => {
  const workerId = 0; //must be get from workers list

  const payload = {
    workerId: `${workerId}`,
  }
  queryWorkerDeleteById(payload)
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

