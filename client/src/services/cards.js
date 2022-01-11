import axios from 'axios';

const host ='http://localhost:4000/api'
const cardService = {};

cardService.getCards = async (id) => {
  return axios({
    url: `${host}/children/${id}/cards`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

cardService.createCards = async (payload) => {
  return axios({
    url: `${host}/cards`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: payload,
  });
};

cardService.updateCards = async (id, data) => {
  return axios({
    url: `${host}/cards/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data,
  });
};

cardService.deleteCards = async (id) => {
  return axios({
    url: `${host}/cards/${id}`,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
  
export default cardService;