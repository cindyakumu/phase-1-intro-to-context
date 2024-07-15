function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr));
}
function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}
function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}
function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);

    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

let employees = createEmployeeRecords([
    ["Thor", "Odinson", "God of Thunder", 100],
    ["Tony", "Stark", "Iron Man", 150]
]);


employees[0] = createTimeInEvent(employees[0], "2024-07-15 0800");
employees[0] = createTimeOutEvent(employees[0], "2024-07-15 1700");

employees[1] = createTimeInEvent(employees[1], "2024-07-15 0900");
employees[1] = createTimeOutEvent(employees[1], "2024-07-15 1900");


console.log(wagesEarnedOnDate(employees[0], "2024-07-15"));
console.log(allWagesFor(employees[1])); 

console.log(calculatePayroll(employees)); 


