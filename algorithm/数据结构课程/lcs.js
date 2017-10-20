// 最长公共子序列 动态规划

function lcs(str1, str2) {
    let arr = [];
    let str1Len = str1.length;
    let str2Len = str2.length;
    let result = [];
    for (let i = 0;i <= str1Len; i++) {
        arr[i] = [];
        for (let j = 0; j <= str2Len; j++) {
            arr[i][j] = 0;
        }
    }
    //array init
    for (let i = 1; i <= str1Len; i++) {
        let index1 = i - 1;
        for (let j = 1; j <= str2Len; j++) {
            let index2 = j - 1;
            if(str1[index1] === str2[index2]){ //当相等时，取左上角的值+1
                arr[i][j] = arr[i - 1][j - 1] + 1 
                
                if(arr[i][j-1] !== arr[i][j] && arr[i-1][j] !== arr[i][j]){
                    result.push(str1[index1]);
                }
            }else{
                arr[i][j] =
                arr[i - 1][j] > arr[i][j - 1] ? arr[i - 1][j] : arr[i][j - 1];
            }
        }
    }
    return arr[str1Len - 1][str2Len -1];
}

lcs('protocol','algorithm')  //2