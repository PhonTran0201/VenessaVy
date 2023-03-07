import { getDateEndOfMonth } from "../functions";



export class HandleDateTime {

    private static instance: HandleDateTime;

    public static getInstance(): HandleDateTime {
        if (!HandleDateTime.instance) {
            HandleDateTime.instance = new HandleDateTime();
        }
        return HandleDateTime.instance;
    }


    /**
    * 
    * @param date ex: dd/mm/yyyy or dd-mm-yyyy ...
    * @returns End date of the month
    */
    getDateEndOfTheMonth(date: string) {
        const temp = date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
        let obj = new Date(temp);
        return getDateEndOfMonth(obj.getFullYear(), obj.getMonth() + 1);
    }
 

    compareDateOrderly(beforeDate: string, afterDate: string) {
        const dt_date1 = new Date(parseInt(beforeDate.substring(6, 10)), parseInt(beforeDate.substring(3, 5)) - 1, parseInt(beforeDate.substring(0, 2)));
        const dt_date2 = new Date(parseInt(afterDate.substring(6, 10)), parseInt(afterDate.substring(3, 5)) - 1, parseInt(afterDate.substring(0, 2)));
        let temp = Number(dt_date2.getTime()) - Number(dt_date1.getTime());
        return temp > 0 ? true : false
    }



}