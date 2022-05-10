import {queryWorkerGetAllList, queryWorkerGetFingerprintData} from "./queries.js";

document.querySelector('#getFingerprint').addEventListener('click', () => getFingerprintId());

const getFingerprintId = () => {
  queryWorkerGetAllList()
        .then((data) => {
            console.log(data.message);//din data in html ca tabel
        })
        .catch((error) => {
            console.log(error);
        });
}