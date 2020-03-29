import {scheduleAPI, scheduleTeacherAPI} from '../API/api'

const getScheduleData = (role, userID, semester, schoolYear, token) => {
    let url =''
    if(role == 'sv'){
        url = scheduleAPI(userID, semester, schoolYear)
    } 
    if(role == 'gv'){
        url = scheduleTeacherAPI(userID, semester, schoolYear)
    }

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then((res) => res.json()).then((data) => {
        return data;
    }).done();
}

module.exports = {
    getScheduleData,
}