exports.parseDate = ()=>{
    let date = new Date().toDateString().split(" ");
    return `${date[2]}-${date[1]}-${date[3]}`;
};

