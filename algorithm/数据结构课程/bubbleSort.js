/**
 * 起泡排序 时间复杂度 O(n^2)
 * 是稳定的排序，因为各相同元素的位置一定是按照之前的先后顺序
 */

 function bubbleSort(arr){
    let left = 0;
    let max = arr.length;

    while(left < max) {
        let index = 0;
        let last = 0;

        while(++index < max){
            if(arr[index - 1] > arr[index]) {
                last = index;
                let temp = arr[index];
                arr[index] =  arr[index - 1];
                arr[index - 1] = temp;
            }
        }
        max = last;
    }
    return arr;
 }

 bubbleSort([1,2,4,5,6,2,1,2,4,3])