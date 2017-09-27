/**
 * 我们会传递给你一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和。
 * 最小的数字并非总在最前面。
 */

function sumAll(arr) {
    let first = Math.min(...arr);
    let last  = Math.max(...arr);
    let sum = 0;
    
    for(let i = first; i <= last; i++){
        sum += i;
    }
    return sum;
}
console.log(sumAll([1, 4])); //10