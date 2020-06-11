import axios from 'axios';
import * as c from './constants';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'https://coronasavior.herokuapp.com/',

});

export async function registerNewUserRequest(data) {
  let res = await api.post(c.USERS, data);
  return res;
}
export async function loginRequest(data) {
  //Cria usuário
  let res = await api.post(c.LOGIN, data)
  //Recebe o Token
  await getToken({
    "username": data.username,
    "password": data.password
  });
  //Cria o Perfil do usuário
  try {
    await createProfile({
      "address": 'address',
      'coordinate_x': '54544654',
      'coordinate_y': '45454545'
    })
  } catch (err) {
    Alert.alert("Erro ao registrar novo profile")
    console.log('Error', err)
  }
  return res;
}

export async function createProfile(data) {

  var aut = await getToken();

  return fetch(c.API_URL + c.PROFILE, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': aut
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

}


//get user points
export async function getProfile() {

  var aut = await getToken();
  var resp = null;

  return fetch(c.API_URL + c.PROFILE, {
    method: 'Get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': aut
    },
  }).then((response) => response.json())
    .then((json) => {
      return json.results[0].points;
    })
    .catch((error) => {
      console.error(error);
    });

}

//get user information
export async function getUserInformation() {

  var aut = await getToken();
  return fetch(c.API_URL + c.USERS, {
    method: 'Get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': aut
    },
  }).then((response) => response.json())
    .then((json) => {
      return json.results[0];
    })
    .catch((error) => {
      console.error(error);
    });
}

//get ranking
export async function getRanking() {

  var aut = await getToken();
  return fetch(c.API_URL + c.RANKING, {
    method: 'Get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': aut
    },
  }).then((response) => response.json())
    .then((json) => {
      return json.results;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function getToken() {
  try {
    const value = await AsyncStorage.getItem('authorization');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Erro get token: " + error);
  }
};

export async function getQuestions(tam = 5) {
  let list = []

  var aut = await getToken();
  return fetch(c.API_URL + c.QUESTION, {
    method: 'Get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': aut
    },
  }).then((response) => response.json())
    .then((json) => {
      json.results.forEach(question => {
        if (!question.is_answered && list.length < tam)
          list.push(question)
      });
    })
    .then(() => {
      return list
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function answerQuestion(question, answer) {
  let data = {
    question: question.url,
    answers: [
      { id: answer.id }
    ]
  }
  var aut = await getToken();
  return axios.post(c.API_URL + c.ANSWER, data, {
    headers: {
      'Authorization': `${aut}`
    }
  })
}

export default api