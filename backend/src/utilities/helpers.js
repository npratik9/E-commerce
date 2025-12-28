const fs = require("fs")
const randomStringGenerate = (length=100) =>{
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const len = chars.length;
    let random = "";
    
    for(i=1 ; i<length ; i++){
        let posn = Math.ceil(Math.random() * (len-1));
        random += chars[posn];
    }
    return random;
}

const fileDelete = (filepath) =>{
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath)
    }
    return false;
}

const dateCreate = (date, day) =>{
    let dateObj = new Date(date);
    const newDate= dateObj.getTime() + (day * 86400000)
    return new Date(newDate)
}

module.exports = {
    randomStringGenerate,
    fileDelete,
    dateCreate
};
