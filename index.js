function createEmployeeRecord([firstNameInput, familyNameInput, titleInput, payPerHourInput]) {
    const employeeRecord = {
        firstName: firstNameInput,
        familyName: familyNameInput,
        title: titleInput,
        payPerHour: payPerHourInput,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays) {
    const allEmployeesRecord = [];
    arrayOfArrays.forEach(element => {
        allEmployeesRecord.push(createEmployeeRecord(element));
    })
    return allEmployeesRecord;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, smallDateStamp) {
    let hourIn = 0;
    employeeRecord.timeInEvents.forEach(element => {
        if (element.date === smallDateStamp) {
            hourIn = element.hour;
        }
    })
    let hourOut = 0;
    employeeRecord.timeOutEvents.forEach(element => {
        if (element.date === smallDateStamp) {
            hourOut = element.hour;
        }
    })
    const hoursWorked = (hourOut - hourIn) / 100 ;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, smallDateStamp) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, smallDateStamp);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
}

function allWagesFor(employeeRecord) {
    const arrayOfWages = [];
    employeeRecord.timeInEvents.forEach(element => {
        const smallDateStamp = element.date;
        arrayOfWages.push(wagesEarnedOnDate(employeeRecord, smallDateStamp))
    })
    return arrayOfWages.reduce(function(accumulator, num) {return accumulator + num}, 0);
}

function calculatePayroll(arrayOfObjects) {
    const arrayOfAllWages = [];
    arrayOfObjects.forEach(element => {
        arrayOfAllWages.push(allWagesFor(element));
    })
    return arrayOfAllWages.reduce(function(accumulator, num) {return accumulator + num}, 0);
}