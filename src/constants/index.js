import AdminHomePage from "../container/AdminHomePage";
import Taskboard from './../container/Taskboard';
import LoginPage from './../container/LoginPage';
import SignupPage from './../container/SignupPage';

export const END_POINT = "http://localhost:3000";


export const STATUSES = [
  {
    value: 0,
    label: "READY",
  },
  {
    value: 1,
    label: "IN PROGESS",
  },
  {
    value: 2,
    label: "COMPLETE",
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATE: 202,
};


export const ADMIN_ROUTES=[
  {
    path : '/admin',
    name : 'Page admin',
    exact : true,
    component : AdminHomePage
  },
  {
    path : '/admin/task-board',
    name : 'Managerment task',
    component : Taskboard
  },
];

export const ROUTES = [
  {
    path : '/login',
    name : "Login",
    component : LoginPage,

  },
  {
    path : '/signup',
    name : "Sign Up",
    component : SignupPage,

  },

]
