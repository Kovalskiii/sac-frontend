import { post } from "../httpMethods";

export async function queryUserRegister(payload) {
  return post({ url: '/user', data: payload.data });
}

export async function queryUserLogin(payload) {
  return post({ url: '/user/login', data: payload.data });
}
