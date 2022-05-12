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
                         alt="Worker photo">
                </div>

                <div class="worker-info-container">
                    <h4>Name: ${el.name}</h4>
                    <h4>RFID: ${el.rfid}</h4>
                    <h4>fingerprintId: ${el.fingerprintId}</h4>
                    <h4>workerId: ${el.id}</h4>
                </div> 

                <div class="worker-btn-container">
                    <button class="button" id="updateWorkerBtn">Update</button>
                    <button class="button" id="deleteWorkerBtn">Delete</button>
                </div>
            </div>
            <hr>
        </div>`
          })
          //
          const updateBtn = workersListContainer.querySelectorAll('#updateWorkerBtn');
          const deleteBtn = workersListContainer.querySelectorAll('#deleteWorkerBtn');

          for (let index in updateBtn) {
            const workerData = {
              photo: workerInfoArr[index].photo,
              firstName: workerInfoArr[index].firstName,
              lastName: workerInfoArr[index].lastName,
              rfid: workerInfoArr[index].rfid,
              fingerprintId: workerInfoArr[index].fingerprintId,
              workerId: workerInfoArr[index].id
            };

            updateBtn[index].addEventListener("click", () => workerUpdate(workerData));
            deleteBtn[index].addEventListener("click", () => workerDelete(workerInfoArr[index].id));
          }
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

