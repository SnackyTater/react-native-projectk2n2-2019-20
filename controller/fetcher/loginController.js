import {loginAPI} from '../API/api'

const login = (username, password) => {
  return fetch(loginAPI(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then((res) => res.json()).then((data) => {
      return data
    }).catch((err) => {console.log(err)})
}

module.exports={
    login,
}