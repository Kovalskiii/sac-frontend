import { get, post } from "../httpMethods";

export async function queryStatisticsSearchByWorkerName(payload) {
  return post({ url: '/statistics/searchByWorkerName', data: payload.data });
}

export async function queryStatisticsGetAll() {
  return get({ url: '/statistics/getAll' });
}
