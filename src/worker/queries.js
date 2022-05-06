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
