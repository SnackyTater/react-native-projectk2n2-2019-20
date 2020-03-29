import {getRegistrationEventAPI, toggleRegisterAPI} from '../API/api'

const getRegistrationEvent = async (token, user) => {
    await fetch(getRegistrationEventAPI(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          _id: user.user._id,
          info: user.user.info
        })
    }).then((res) => res.json()).then((data) => {
        return data
    }).catch((err) => {console.log(err)})
}

const toggleRegister = async (lessons, selectedSubject, userID, semester, schoolYear, token) => {
    await fetch(toggleRegisterAPI(userID, semester, schoolYear), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          lesson: lessons,
          subject: selectedSubject
        })
    }).then((res) => res.json()).then((data) => {
        return data
    }).done();
}

module.exports = {
    getRegistrationEvent,
    toggleRegister,
}