exports.parseDate = ()=>{
    let date = new Date().toDateString().split(" ");
    return `${date[2]}-${date[1]}-${date[3]}`;
};
exports.parseTotal = (bill)=>{
    let total = 0;
    bill.forEach(prodcut => {
        total += (prodcut.price * prodcut.quantity);
    });
    return total;
};

