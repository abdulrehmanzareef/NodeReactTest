import axios from 'axios';

const host ='http://localhost:4000/api'
const childService = {};

childService.getChildren = async () => {
  return axios({
    url: `${host}/children`,
    method: 'get',
    headers: {
        "Content-Type":"application/json"
    },
  });
};

childService.getChild = async (id) => {
  return axios({
    url: `${host}/children/${id}`,
    method: 'get',
    headers: {
        "Content-Type":"application/json"
    },
  });
};

childService.createChildren = async (data) => { 
  return axios({
    url: `${host}/children`,
    method: 'post',
    headers: {
        "Content-Type":"application/json"
    },
    data,
  });
};

childService.updateChildren = async (id, data) => {
  return axios({
    url: `${host}/children/${id}`,
    method: 'put',
    headers: {
      "Content-Type": "application/json"
    },
    data,
  });
};

childService.deleteChildren = async (id) => {
  return axios({
    url: `${host}/children/${id}`,
    method: 'delete',
    headers: {
        "Content-Type":"application/json"
    },
  });
};

export default childService;