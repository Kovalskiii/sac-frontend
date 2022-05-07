import { Get, Post } from "../httpMethods";

export async function queryStatisticsSearchByWorkerName(payload) {
  return Post({ url: '/statistics/searchByWorkerName', data: payload.data });
}

export async function queryStatisticsGetAll() {
  return Get({ url: '/statistics/getAll' });
}
