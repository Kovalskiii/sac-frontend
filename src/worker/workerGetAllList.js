import {queryWorkerGetAllList, queryWorkerGetFingerprintData} from "./queries.js";


document.querySelector('#getFingerprint').addEventListener('click', () => getworkerGEtAllList());

const getworkerGEtAllList = () => {
  queryWorkerGetAllList()
        .then((data) => {
            console.log(data);//din data in html ca tabel
        })
        .catch((error) => {
            console.log(error);
        });
}