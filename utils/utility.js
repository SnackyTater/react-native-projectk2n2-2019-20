import { AsyncStorage } from 'react-native';

const getTimeNow = () => {
    let date = new Date();
    let today = {
        date: (date.getDate()==0) ? 8 : date.getDate() + 1,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };
    return today;
}

const getCurrentSemesterAndYear = (today) => {
    let schoolTime = {
        currentYear: '',
        currentSemester: 1,
    }
    if(today.month >= 9 && today.month <= 11){
        schoolTime.currentYear = today.year + '-' + (today.year+1);
        schoolTime.currentSemester = 0;
    }
    if(today.month == 12){
        schoolTime.currentYear = today.year + '-' + (today.year+1);
        schoolTime.currentSemester = 1;
    }
    if(today.month <=3){
        schoolTime.currentYear = (today.year-1) + '-' + today.year;
        schoolTime.currentSemester = 1;
    }
    if(today.month >= 4 && today.month <=6){
        schoolTime.currentYear = (today.year-1) + '-' + today.year;
        schoolTime.currentSemester = 2;
    }
    return schoolTime;
}

const createLoginSession = () => {
    let session = {
        Start: Date.now(),
        End: Date.now() + 1000 * 60 * 60 * 24
    }
    AsyncStorage.setItem('session', JSON.stringify(session)).catch((err) => {console.log('')});
}

const getAppConfig = (token) => {
    fetch('https://dangkyhoctlu.herokuapp.com/api/app-config', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        AsyncStorage.setItem('appConfig', JSON.stringify(data)).catch((err) => {console.log('')});
    }).done();
}

const getStudentGroup = () => {
    AsyncStorage.getItem('user').then((preData) => {
        let user = JSON.parse(preData);
        let appConfig = AsyncStorage.getItem('appConfig').then((preData) => {
            return JSON.parse(preData);
        })
        let holder = appConfig.lastestSchoolYear - user.user.info.schoolYear;
        let speciality = user.user.info.speciality.shortName;
        switch(holder){
            case 0:
                return 3;
                break;
            case 1:
                return 2;
                break;
            default:
                if(speciality === "TI" || speciality === "TC" || speciality === "TM"){
                    return 2;
                } else {
                    return 1;
                }
                break;
        }
    })
}

module.exports = {
    getTimeNow,
    getCurrentSemesterAndYear,
    createLoginSession,
    getAppConfig,
    getStudentGroup
}