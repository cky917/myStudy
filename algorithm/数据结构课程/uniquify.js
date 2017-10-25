/**
 * 有序数组去重 
 */

 function uniquify(arr) {
     let i = 0;
     let j = 0;
     let size = 1;
     let len = arr.length;
     while( ++ j < len) {
         if(arr[i] !== arr[j] && arr[i] < arr[j]){
             arr[++i] = arr[j]
             size ++ ;
         }
     }
     arr.length = size;
     return arr;
 }

 uniquify([1,1,1,1,2,2,2,3,3,3,5,5,5,8,8,8,8,8]) // [1,2,3,5,8]