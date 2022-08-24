const createEmployeeRecord = function(array){
const employee = {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
  };
  return employee;
}

const createEmployeeRecords = function(arrays){ // array of arrays
return arrays.map(emp => createEmployeeRecord(emp))
}

const createTimeInEvent = function(record, stamp){
  let [date, hour] = stamp.split(' ')
  const newInRecord = {
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  }
  record.timeInEvents.push(newInRecord)
  return record;
}

const createTimeOutEvent = function(record, stamp){
  let [date, hour] = stamp.split(' ')
  //const timeOut = createEmployeeRecord(record)
  const newOutRecord = {
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  }
  record.timeOutEvents.push(newOutRecord)
  return record;
}

const hoursWorkedOnDate = function(record, targetDate){
  const inHours = record.timeInEvents.find((date) => date.date === targetDate);
  const outHours = record.timeOutEvents.find((date) => date.date === targetDate);
  let hours = outHours.hour - inHours.hour;
  // for (let i=0; i<record.timeInEvents.length; i++){
  //   if (record.timeInEvents[i].date === targetDate){
  //        if (record.timeOutEvents[i].date === targetDate){
  //             hours = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
  //         }
  //     }
  // }
return hours/100
}
  
const wagesEarnedOnDate = function(record, targetDate){
return hoursWorkedOnDate(record, targetDate) * record.payPerHour;
}


const allWagesFor = function(record){
  let dates = record.timeInEvents.map((e) => {return e.date})
  let pay = dates.reduce((value, d) => {
    return value + wagesEarnedOnDate(record, d)
  }, 0)
  return pay;
/*let pay = [];
let dates = record.timeInEvents.map((e) => {return e.date})
dates.forEach(date => {
  pay.push(wagesEarnedOnDate(record, date))
});
return pay.reduce(( val1, val2 ) => val1 + val2)*/
}


const calculatePayroll = (record) => {
return record.reduce((total, rec) => {
  return total + allWagesFor(rec)
}, 0)
}