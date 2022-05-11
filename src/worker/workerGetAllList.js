import { queryWorkerGetAllList } from "./queries.js";


document.querySelector('#collectDataBtn').addEventListener('click', () => getWorkersList());

const getWorkersList = () => {
  queryWorkerGetAllList()
        .then((data) => {
            console.log(data.payload);//din data in html ca tabel
        })
        .catch((error) => {
            console.log(error);
        });
}
