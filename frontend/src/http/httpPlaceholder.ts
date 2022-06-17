import axios from "axios";

export const apiGet = axios.create({baseURL: "http://localhost:5000"})
export const apiPost = axios.create({baseURL: "http://localhost:5000"})
export const apiDelete = axios.create({baseURL: "http://localhost:5000"})
export const apiPut = axios.create({baseURL: "http://localhost:5000"})

apiGet.interceptors.request.use((config) => {
  config.method = "get";
  const token = localStorage.getItem("token");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

apiPost.interceptors.request.use((config) => {
  config.method = "post";
  const token = localStorage.getItem("token");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

apiDelete.interceptors.request.use((config) => {
  config.method = "delete";
  const token = localStorage.getItem("token");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

apiPut.interceptors.request.use((config) => {
  config.method = "put";
  const token = localStorage.getItem("token");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});
