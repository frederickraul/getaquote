var d=new Date();
const currentDayNumber = d.getDay();
const currentTime = d.getHours();
const currentMinutes = d.getMinutes();

export const years = [
  { value: "2024", labelValue: "12:00 AM", label: "2024"},
  { value: "2023", labelValue: "12:00 AM", label: "2023"},
  { value: "2022", labelValue: "12:00 AM", label: "2022"},
  { value: "2021", labelValue: "12:00 AM", label: "2021"},
  { value: "2020", labelValue: "12:00 AM", label: "2020"},
];
export const testOptions = [
  { value: "Option 1", labelValue: "12:00 AM", label: "Option 1"},
  { value: "Option 2", labelValue: "12:00 AM", label: "Option 2"},
  { value: "Option 3", labelValue: "12:00 AM", label: "Option 3"},
  { value: "Option 4", labelValue: "12:00 AM", label: "Option 4"},
  { value: "Option 5", labelValue: "12:00 AM", label: "Option 5"},

];

export const hours = [
  { value: "00:00:00", label: "12:00 AM"},
  { value: "00:15:00", label: "12:15 AM"},
  { value: "00:30:00", label: "12:30 AM"},
  { value: "00:45:00", label: "12:45 AM"},
  { value: "01:00:00", label: "01:00 AM"},
  { value: "01:15:00", label: "01:15 AM"},
  { value: "01:30:00", label: "01:30 AM"},
  { value: "01:45:00", label: "01:45 AM"},
  { value: "02:00:00", label: "02:00 AM"},
  { value: "02:15:00", label: "02:15 AM"},
  { value: "02:30:00", label: "02:30 AM"},
  { value: "02:45:00", label: "02:45 AM"},
  { value: "03:00:00", label: "03:00 AM"},
  { value: "03:15:00", label: "03:15 AM"},
  { value: "03:30:00", label: "03:30 AM"},
  { value: "03:45:00", label: "03:45 AM"},
  { value: "04:00:00", label: "04:00 AM"},
  { value: "04:15:00", label: "04:15 AM"},
  { value: "04:30:00", label: "04:30 AM"},
  { value: "04:45:00", label: "04:45 AM"},
  { value: "05:00:00", label: "05:00 AM"},
  { value: "05:15:00", label: "05:15 AM"},
  { value: "05:30:00", label: "05:30 AM"},
  { value: "05:45:00", label: "05:45 AM"},
  { value: "06:00:00", label: "06:00 AM"},
  { value: "06:15:00", label: "06:15 AM"},
  { value: "06:30:00", label: "06:30 AM"},
  { value: "06:45:00", label: "06:45 AM"},
  { value: "07:00:00", label: "07:00 AM"},
  { value: "07:15:00", label: "07:15 AM"},
  { value: "07:30:00", label: "07:30 AM"},
  { value: "07:45:00", label: "07:45 AM"},
  { value: "08:00:00", label: "08:00 AM"},
  { value: "08:15:00", label: "08:15 AM"},
  { value: "08:30:00", label: "08:30 AM"},
  { value: "08:45:00", label: "08:45 AM"},
  { value: "09:00:00", label: "09:00 AM"},
  { value: "09:15:00", label: "09:15 AM"},
  { value: "09:30:00", label: "09:30 AM"},
  { value: "09:45:00", label: "09:45 AM"},
  { value: "10:00:00", label: "10:00 AM"},
  { value: "10:15:00", label: "10:15 AM"},
  { value: "10:30:00", label: "10:30 AM"},
  { value: "10:45:00", label: "10:45 AM"},
  { value: "11:00:00", label: "11:00 AM"},
  { value: "11:15:00", label: "11:15 AM"},
  { value: "11:30:00", label: "11:30 AM"},
  { value: "11:45:00", label: "11:45 AM"},
  { value: "12:00:00", label: "12:00 PM"},
  { value: "12:15:00", label: "12:15 PM"},
  { value: "12:30:00", label: "12:30 PM"},
  { value: "12:45:00", label: "12:45 PM"},
  { value: "13:00:00", label: "01:00 PM"},
  { value: "13:15:00", label: "01:15 PM"},
  { value: "13:30:00", label: "01:30 PM"},
  { value: "13:45:00", label: "01:45 PM"},
  { value: "14:00:00", label: "02:00 PM"},
  { value: "14:15:00", label: "02:15 PM"},
  { value: "14:30:00", label: "02:30 PM"},
  { value: "14:45:00", label: "02:45 PM"},
  { value: "15:00:00", label: "03:00 PM"},
  { value: "15:15:00", label: "03:15 PM"},
  { value: "15:30:00", label: "03:30 PM"},
  { value: "15:45:00", label: "03:45 PM"},
  { value: "16:00:00", label: "04:00 PM"},
  { value: "16:15:00", label: "04:15 PM"},
  { value: "16:30:00", label: "04:30 PM"},
  { value: "16:45:00", label: "04:45 PM"},
  { value: "17:00:00", label: "05:00 PM"},
  { value: "17:15:00", label: "05:15 PM"},
  { value: "17:30:00", label: "05:30 PM"},
  { value: "17:45:00", label: "05:45 PM"},
  { value: "18:00:00", label: "06:00 PM"},
  { value: "18:15:00", label: "06:15 PM"},
  { value: "18:30:00", label: "06:30 PM"},
  { value: "18:45:00", label: "06:45 PM"},
  { value: "19:00:00", label: "07:00 PM"},
  { value: "19:15:00", label: "07:15 PM"},
  { value: "19:30:00", label: "07:30 PM"},
  { value: "19:45:00", label: "07:45 PM"},
  { value: "20:00:00", label: "08:00 PM"},
  { value: "20:15:00", label: "08:15 PM"},
  { value: "20:30:00", label: "08:30 PM"},
  { value: "20:45:00", label: "08:45 PM"},
  { value: "21:00:00", label: "09:00 PM"},
  { value: "21:15:00", label: "09:15 PM"},
  { value: "21:30:00", label: "09:30 PM"},
  { value: "21:45:00", label: "09:45 PM"},
  { value: "22:00:00", label: "10:00 PM"},
  { value: "22:15:00", label: "10:15 PM"},
  { value: "22:30:00", label: "10:30 PM"},
  { value: "22:45:00", label: "10:45 PM"},
  { value: "23:00:00", label: "11:00 PM"},
  { value: "23:15:00", label: "11:15 PM"},
  { value: "23:30:00", label: "11:30 PM"},
  { value: "23:45:00", label: "11:45 PM"},
];


export const formatTime =(timeString:string) => {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return ((hour % 12 <= 9 && hour % 12 > 0) ? "0" :"") + (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

export const isOpen =(timeString:string, ClosetimeString:string) => {
  const date = new Date();

  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  const startTime=timeString;
  const endTime=ClosetimeString;

  const str1 = startTime.split(":");
  const str2 = endTime.split(":");

  const currentTotal = currentHour * 3600 + currentMinute * 60;
  const startTimeTotal = Number(Number(str1[0]) * 3600 + Number(str1[1]) * 60);
  const endTimeTotal = Number(Number(str2[0]) * 3600 + Number(str2[1]) * 60);

  //console.log(currentTotal+ " - " + startTimeTotal + " - " + endTimeTotal);
  
  if (startTimeTotal <= endTimeTotal) {
    // If the end time is on the same day
    if ((startTimeTotal - currentTotal) <= 3600 && (startTimeTotal - currentTotal) > 0) {
        return "Open Soon";
    }

    if (currentTotal >= startTimeTotal && currentTotal <= endTimeTotal) {
      if(endTimeTotal - currentTotal <= 3600){
        return "Close Soon";
      }
      return "Open Now";
   }
  }

  return "Close Now";
}

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const formatDate = (value:any) =>{
  var dt = new Date(value);
  const joined = (monthNames[dt.getMonth()]) + " " + dt.getDay() + " " + dt.getFullYear();

  return joined;

}