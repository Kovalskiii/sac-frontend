import { del, get, patch, post } from "../httpMethods";

export async function queryWorkerCreate(payload) {
  return post({ url: '/worker/create', data: payload.data });
}

export async function queryWorkerDeleteById(payload) {
  return del({ url: `/worker/delete/${payload.workerId}` });
}

export async function queryWorkerUpdateById(payload){
  return patch({ url: `/worker/update/${payload.workerId}`, data: payload.data });
}

export async function queryWorkerGetAllList() {
  return get({ url: '/worker/getAll' });
}

export async function queryWorkerGetById(payload) {
  return get({ url: `/worker/get/${payload.workerId}` });
}

export async function queryWorkerSearchByName(payload) {
  return post({ url: '/worker/searchByName', data: payload.data });
}

export async function queryWorkerGetFingerprintData() {
  return get({ url: '/worker/get/fingerprint/data' });
}

export async function queryWorkerGetRfidData() {
  return get({ url: '/worker/get/rfid/data' });
}

export async function queryWorkerSetRegisterMode(payload) {
  return post({ url: '/worker/set/registerMode' });
}

export async function queryWorkerCancelRegisterMode(payload) {
  return post({ url: '/worker/cancel/registerMode' });
}
