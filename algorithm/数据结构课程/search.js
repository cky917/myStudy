/**
 * 有序数组的二分查找，如果没找到返回不大于目标元素的最大值的位置 
 * 时间复杂度 O(logn）
 */

function search (arr,target) {
    let min = 0;
    let max = arr.length;

    while ( min < max){
        let mid = Math.floor((min + max) / 2) //向下取整

        if(target < arr[mid] ){
            max = mid;
        }else if( arr[mid] < target){
            min = mid + 1;
        }else{
            return mid;
        }
    }
    return -1;
}

search([1,2,3,4,5,6,7,8],6) // 5