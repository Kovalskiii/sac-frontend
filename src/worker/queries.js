import { Del, Get, Patch, Post } from "../httpMethods";

export async function queryWorkerCreate(payload) {
  const contentType = 'multipart/form-data';
  return Post({ url: '/worker/create', data: payload.data, type: contentType });
}

export async function queryWorkerDeleteById(payload) {
  return Del({ url: `/worker/delete/${payload.workerId}` });
}

export async function queryWorkerUpdateById(payload){
  const contentType = 'multipart/form-data';
  return Patch({ url: `/worker/update/${payload.workerId}`, data: payload.data, type: contentType });
}

export async function queryWorkerGetAllList() {
  return Get({ url: '/worker/getAll' });
}

export async function queryWorkerGetById(payload) {
  return Get({ url: `/worker/get/${payload.workerId}` });
}

export async function queryWorkerSearchByName(payload) {
  return Post({ url: '/worker/searchByName', data: payload.data });
}

export async function queryWorkerGetFingerprintData() {
  return Get({ url: '/worker/get/fingerprint/data' });
}

export async function queryWorkerGetRfidData() {
  return Get({ url: '/worker/get/rfid/data' });
}

export async function queryWorkerSetRegisterMode() {
  return Post({ url: '/worker/set/registerMode' });
}

export async function queryWorkerCancelRegisterMode() {
  return Post({ url: '/worker/cancel/registerMode' });
}
