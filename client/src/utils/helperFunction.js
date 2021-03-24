export const parseDate = ()=>{
    let date = new Date().toLocaleDateString().split("/");
    return `${date[0]}-${date[1]}-${date[2]}`;
};
export const parseTotal = (bill)=>{
    let total = 0;
    if(bill && bill.length > 0){
        bill.forEach(prodcut => {
            total += (prodcut.price * prodcut.quantity);
        });
    };
    return total;
};
let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export const formatDate = (date)=>{
    let splitDate = date.split("-");
    if(splitDate[0].length <= 1){
        splitDate[0] = "0" + splitDate[0]; 
    };
    return `${splitDate[0]}-${months[parseInt(splitDate[1])]}-${splitDate[2]}`;
};
let compareFunction = (itemA, itemB)=>{
    let {date} = itemA;
    let [dayA, monthA, yearA] = date.split("-");
    date = itemB.date;
    let [dayB, monthB, yearB] = date.split("-");
    if(yearA !== yearB){
        return yearA < yearB ? 1 : -1;
    }else if(monthA !== monthB){
        return monthA < monthB ? 1 : -1;
    }else{
        return dayA < dayB ? 1 : -1;
    };
};
export const sortDates = (dates)=>{
    let sortedDays = dates.sort(compareFunction);
    return sortedDays;
};
