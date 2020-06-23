import AdminHomePage from "../container/AdminHomePage";
import TaskBoard from './../container/Taskboard'

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
    path : '/',
    name : 'Page admin',
    exact : true,
    component : AdminHomePage
  },
  {
    path : '/task-board',
    name : 'Managerment task',
    exact : true,
    component : TaskBoard
  },
]
