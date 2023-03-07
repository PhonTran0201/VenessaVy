import { compareDesc } from "date-fns";
import { getDate } from "./functions";

/**
 * Guarantee installment posted date rule:
 *  If start date of the guarantee is created date, the posting date (the day the instalment is sent to 247office) is next Wednesday of the Created date
 *  If start date is before created date (Start date is in the past), the posting date is next Wednesday of the Created date. Posted time : 0:00 AM Wendnesday
 *  If start date is after created date (Start date is in the future), the posting date is the next Wednesday of the Start date. Posted time : 0:00 AM Wendnesday
 *  On the last date of the month, all instalments which have not been sent to 247office should be sent. Posted time: 11 PM of the day.
 * 
 * @param startDate format "dd/MM/yyyy"
 * @returns postedDate
 */
export function getPostedDateForHogsTenant(startDate: string = "") {
  // getDay() => Sunday = 0, Monday = 1,...

  const today = getDate(0);
  const dateToday = new Date(today.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
  const dateStartDate = new Date(startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
  const dateCompare = compareDesc(dateStartDate, dateToday) >= 0 ? dateToday : dateStartDate;
  const dateCompareTemp = dateCompare.toLocaleDateString('en-GB');

  let result = new Date();
  if (dateCompare.getDay() === 1 || dateCompare.getDay() === 2) {// dateCompare = monday, tuesday
    let count = 0;
    for (let i = 1; i <= 14; i++) {
      let temp = dateCompare;
      temp.setDate(dateCompare.getDate() + 1);
      if (temp.getDay() === 3) {
        count++;
        if (count === 2) {
          result = temp;
          break;
        }
      }
    }
  }
  else if (dateCompare.getDay() === 3) {// dateCompare = Wednesday
    let temp = dateCompare;
    temp.setDate(dateCompare.getDate() + 7);
    result = temp;
  }
  else {// dateCompare = Thursday, Friday, Saturday, Sunday
    for (let i = 1; i <= 14; i++) {
      let temp = dateCompare;
      temp.setDate(dateCompare.getDate() + 1);
      if (temp.getDay() === 3) {
        result = temp;
        break;
      }
    }
  }

  // On the last date of the month, all instalments which have not been sent to 247office should be sent. Posted time: 11 PM of the day.
  if (parseInt(result.toLocaleDateString('en-GB').split("/")[1]) !== parseInt(dateCompareTemp.split("/")[1])) {
    result = new Date(parseInt(dateCompareTemp.split("/")[2]), parseInt(dateCompareTemp.split("/")[1]), 0);
  }

  let dd = String(result.getDate()).padStart(2, "0");
  let MM = String(result.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = result.getFullYear();

  return `${dd}/${MM}/${yyyy}`;
}
