import { queryWorkerGetAllList } from "./queries.js";


// document.querySelector('.workers-list-container').addEventListener('load', () => getWorkersList());
document.addEventListener("DOMContentLoaded", () => getWorkersList());

export const getWorkersList = () => {
  queryWorkerGetAllList()
        .then((data) => {
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
