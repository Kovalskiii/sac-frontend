import {
  queryWorkerDeleteById,
  queryWorkerSearchByName,
  queryWorkerSetRegisterMode
} from "./queries";
import pkg from 'lodash';
import { getWorkersList } from "./workerGetAllList";
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
          workersListContainer.innerHTML = '';
          workerInfoArr.forEach(el => {
            workersListContainer.innerHTML += `

        <div class="workers-list-item">
            <div class="workers-list">
                <div class="worker-photo-container">
                    <img src="${el.photo}"
                         alt="Italian Trulli" width="120" height="150">
                </div>

                <div class="worker-info-container">
                    <h4>Name: ${el.name}</h4>
                    <h4>RFID: ${el.rfid}</h4>
                    <h4>fingerprintId: ${el.fingerprintId}</h4>
                    <h4>workerId: ${el.id}</h4>
                </div> 

                <div class="worker-btn-container">
                    <button class="button" id="updateWorkerBtn">Update</button>
                    <button class="button" href="#" id="deleteWorkerBtn">Delete</button>
                </div>
            </div>
            <hr>
        </div>`
          })
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

const updateBtn = document.querySelector('#updateWorkerBtn');

if (updateBtn) {
  deleteBtn.addEventListener('click', () => workerUpdate());
}

const workerUpdate = async () => {
  //
  await queryWorkerSetRegisterMode()
    .then((data) => {
      document.location='workerUpdate.html';
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

const deleteBtn = document.querySelector('#deleteWorkerBtn');

if (deleteBtn) {
  deleteBtn.addEventListener('click', () => workerDelete());
}

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

