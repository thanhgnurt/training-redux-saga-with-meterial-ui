import axiosService from "./../commons/axiosService";
import { END_POINT } from "./../constants";
import qs from "query-string";

const url = "/tasks";

export const getList = (params={}) => {
  let queryParams = "";
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(END_POINT + url + queryParams);
};

export const addTask = (data) => {
  return axiosService.post(END_POINT + url, data);
};

export const updateTask = (data, taskId) =>{
  return axiosService.put(END_POINT + url+"/"+taskId, data);
}

export const deleteTask = (taskId) => {
  return axiosService.delete(END_POINT + url+"/"+taskId);
};
