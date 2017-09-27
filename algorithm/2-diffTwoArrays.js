/**
 * 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。
 */

function diff(arr1, arr2) {
    let newArr = arrDiff(arr1,arr2).concat(arrDiff(arr2,arr1));

    function arrDiff(arr,targetArr){
      return arr.filter(item=>{
        return targetArr.indexOf(item) == -1;
      });
    }
    return newArr;
}

console.log(diff([1, 2, 3, 5], [1, 2, 3, 4, 5])); //[4]
console.log(diff([1, "calf", 3, "piglet"], [1, "calf", 3, 4])); //[ 'piglet', 4 ]