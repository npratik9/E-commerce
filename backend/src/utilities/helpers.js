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

module.exports = randomStringGenerate;
