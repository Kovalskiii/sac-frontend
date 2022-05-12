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
                         alt="Italian Trulli">
                </div>

                <div class="worker-info-container">
                    <h4>Name: ${el.name}</h4>
                    <h4>RFID: ${el.rfid}</h4>
                    <h4>fingerprintId: ${el.fingerprintId}</h4>
                    <h4>workerId: ${el.id}</h4>
                </div> 

                <div class="worker-btn-container">
                    <button class="button" id="updateWorkerBtn" onclick="workerUpdate(el.id)">Update</button>
                    <button class="button" id="deleteWorkerBtn" onclick="workerDelete(el.id)">Delete</button>
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

const updateBtn = document.querySelectorAll('#updateWorkerBtn');

// if (updateBtn) {
//   updateBtn.addEventListener('click', (event) => workerUpdate(event));
// }
console.log(updateBtn)

for (let i = 0; i < updateBtn.length; i++) {
  updateBtn[i].addEventListener("click", () => workerUpdate());
}

export const workerUpdate = async () => {
  console.log("blafgsdfad")
  //
  await queryWorkerSetRegisterMode()
    .then((data) => {
      console.log(data);
      //document.location='workerUpdate.html';
      console.log(data.message);
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
      if (data.payload) {
        console.log(data.message);
        document.querySelector('input[type="search"]').value = '';
        getWorkersList();
      }
      else {
        console.log(data.response.data.message);
        document.querySelector('input[type="search"]').value = '';
        getWorkersList();
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

