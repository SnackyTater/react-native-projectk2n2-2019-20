import {resultAPI} from '../API/api'

const getResult = async(role, userID, speciality, token) => {
    await fetch(resultAPI(role, userID, speciality), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then((res) => res.json()).then((data) => {
        return data
    }).catch((err) => {console.log(err)})
}

module.exports = {
    getResult,
}