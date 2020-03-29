const loginAPI = () => {
    let string = 'https://dangkyhoctlu.herokuapp.com/api/login'
    return string
}

const getRegistrationEventAPI = () => {
    return 'https://dangkyhoctlu.herokuapp.com/api/registration-event/subjects';
}

const toggleRegisterAPI = (userID, semester, schoolYear) => {
    return 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userID +'/semester/' + semester +'/year/' + schoolYear + '/toggle-register'
}

const scheduleAPI = (userID, semester, schoolYear) => {
    return 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userID + '/semester/'+ semester +'/year/'+ schoolYear +'?active=true';
}

const resultAPI = (role, userID, speciality) => {
    return 'https://dangkyhoctlu.herokuapp.com/api/result/' + role + '/' + userID + '?speciality=' + speciality;
}

const schoolScheduleAPI = () => {
    return 'https://dangkyhoctlu.herokuapp.com/api/school-schedule/all'
}

const scheduleTeacherAPI = (userID, semester, schoolYear) => {
    return 'https://dangkyhoctlu.herokuapp.com/api/school-schedule/instructor-schedule/'+ userID +'?year=' + schoolYear + '&semester=' + semester
}

module.exports = {
    loginAPI,
    getRegistrationEventAPI,
    toggleRegisterAPI,
    scheduleAPI,
    resultAPI,
    schoolScheduleAPI,
    scheduleTeacherAPI,
}
