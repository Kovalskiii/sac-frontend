import { queryWorkerCancelRegisterMode, queryWorkerGetAllList } from "./queries.js";
import { workerUpdate, workerDelete } from "./worker";

document.addEventListener("DOMContentLoaded", () => getWorkersList());

export const getWorkersList = () => {
  // queryWorkerCancelRegisterMode()
  //   .then((data) => {
  //     console.log(data.message);
  //   })
  //   .catch((error) => {
  //     console.log(error.response.data.message);
  //   });

  queryWorkerGetAllList()
        .then((data) => {
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

export const workerListItem = (workerInfoArr, workersListContainer) => {
  workersListContainer.innerHTML = '';
  workerInfoArr.forEach(el => {
    //
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
