const personalScheduleProcessor = (rawList) => {
    let processedList = rawList.map((listItem) => {
        let shift = listItem.from.name + '-' + listItem.to.name;
        return [listItem.class.name, listItem.classRoom.name, listItem.dayOfWeek, shift]
    })
    return processedList;
}

const schoolScheduleProcessor = (rawList, filter) => {
    let schoolYearFrom = filter.schoolYear.slice(0,4);
    let SchoolYearTo = filter.schoolYear.slice(5,10);

    let processedList = rawList.map((listItem) => {
        if(listItem.semester == filter.semester && listItem.studentGroup == filter.group && listItem.year.from == schoolYearFrom && listItem.year.to == SchoolYearTo){
            if(count >= 100){
                return null;
            }
            //setup variable 
            let holder = [];
            var shift = listItem.from.name + '-' + listItem.to.name;

            //push to holder
            holder.push(listItem.class.subject.subjectID);
            holder.push(listItem.class.subject.name);
            holder.push(listItem.class.name);
            holder.push(listItem.dayOfWeek);
            holder.push(shift);
            holder.push(listItem.classRoom.name);
            holder.push(listItem.class.subject.coefficient);
            holder.push(listItem.instructor.user.name);

            //incase of instructor is undefined (fixed)

            // if (typeof listItem.instructor.user === "undefined"){
            //     holder.push('');
            // }else{
            //     holder.push(listItem.instructor.user.name);
            // }

            //push to processed list
            return holder
        }
    })
    return processedList;
}

const resultProcessor = (rawList) => {
    let processedList = rawList.map((listItem) => {
        let holder = [];

        holder.push(listItem.subject.subjectID);
        holder.push(listItem.subject.name);
        holder.push(listItem.subject.credits);
        holder.push(listItem.grade);

        return processedList.push(holder);
    })
    return processedList;
}

module.exports = {
    resultProcessor,
    schoolScheduleProcessor,
    personalScheduleProcessor,
}
