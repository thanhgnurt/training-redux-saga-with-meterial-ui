import axiosService from './../commons/axiosService';
import {END_POINT} from './../constants';

const url = "/tasks";

export const getList = ()=>{
  return axiosService.get(END_POINT+url)
}

