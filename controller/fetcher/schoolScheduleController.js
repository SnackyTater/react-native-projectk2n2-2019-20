import {schoolScheduleAPI} from '../API/api'

const getSchoolSchedule = async(token) => {
    await fetch(schoolScheduleAPI(), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then((res) => res.json()).then((data) => {
        return data
    }).done();
}

module.exports = {
    getSchoolSchedule
}