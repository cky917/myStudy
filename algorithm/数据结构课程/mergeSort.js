function magic(total){
    let count = total;
    let strArr = [];
    
    while(count !== 0){
        let result;
       
        if((count - 2) % 2 === 0){
            result = magic2(count);
        }else{
            result = magic1(count);
        }
        count = result.num;
        strArr.unshift(result.type);
    }
    return strArr.join('');
}

function magic1(num){
    return {num:(num - 1)/2,type:1}
}

function magic2(num){
    return {num: (num - 2)/2,type:2}
}

magic(10)