import { Post } from "../httpMethods";

export async function queryUserRegister(payload) {
  return Post({ url: '/user', data: payload.data });
}

export async function queryUserLogin(payload) {
  return Post({ url: '/user/login', data: payload.data });
}
