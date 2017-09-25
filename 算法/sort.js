const arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50,1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

/**
 * 交换数组中指定2个位置的值
 * @param  arr 
 * @param  i 第一个要交换的索引
 * @param  j 第二个要交换的索引
 */
function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function bubble(arr){
    console.time("冒泡排序速度: ")
    const len = arr.length;
    for(let i = 0; i < len - 1; i++){
        for(let j = 0; j < len - i -1 ; j++){
            if(arr[j] > arr[j+1]){
                swap(arr,j,j+1);
            }
        }
    }
    console.timeEnd("冒泡排序速度: ") 
    return arr;
}

function improveBubble(arr){
    console.time("加flag后冒泡排序速度: ")
    for(let i = 0; i < arr.length - 1; i++){
        let flag = false;
        for(let j = 0; j < arr.length - 1 - i; j++){
          if(arr[j] > arr[j+1]){
            swap(arr, j, j+1);
            flag = true;
          }
        }
        if(!flag){
          break;
        }
    }
    console.timeEnd("加flag后冒泡排序速度: ");
    return arr;
}

function improveBubble2(arr, len){
    console.time("记录位置后冒泡排序速度: ")
    for(let i = len - 1; i >= 0; i--){
      let pos = 0;
      for(let j = 0; j < i; j++){
        if(arr[j] > arr[j+1]){
          swap(arr, j, j+1);
          pos = j + 1;
        }
      }
      len = pos + 1;
    }
    console.timeEnd("记录位置后冒泡排序速度: ")
    return arr;
}

function selectionSort(arr){
    console.time("选择排序速度: ")
    for(let i = 0; i < arr.length - 1; i++){
      let index = i;
      for(let j = i+1; j < arr.length; j++){
        if(arr[index] > arr[j]){
          index = j;
        }
      }
      swap(arr, i, index);
    }
    console.timeEnd("选择排序速度: ")
    return arr;
}

function insertSort(arr){
    console.time("插入排序速度: ")
    for(let i = 0; i < arr.length; i++){
      let temp = arr[i];
      for(let j = 0; j < i; j++){
        if(temp < arr[j] && j === 0){
          arr.splice(i, 1);
          arr.unshift(temp);
          break;
        }else if(temp > arr[j] && temp < arr[j+1] && j < i - 1){
          arr.splice(i, 1);
          arr.splice(j+1, 0, temp);
          break;
        }
      }
    }
    console.timeEnd("插入排序速度: ")
    return arr;
}

function quickSort(arr){
    console.time("快速排序速度: ")
    if(arr.length <= 1){
      return arr;
    }
    let temp = arr[0];
    const left = [];
    const right = [];
    for(var i = 1; i < arr.length; i++){
      if(arr[i] > temp){
        right.push(arr[i]);
      }else{
        left.push(arr[i]);
      }
    }
    return quickSort(left).concat([temp], quickSort(right));
}

function mergeSort(arr){
    console.time("归并排序速度: ")
    const len = arr.length;
    
    for(let seg = 1; seg < len; seg += seg){
      let arrB = [];
      for(let start = 0; start < len; start += 2*seg){
        let row = start, mid = Math.min(start+seg, len), heig = Math.min(start + 2*seg, len);
        let start1 = start, end1 = mid;
        let start2 = mid, end2 = heig;
        while(start1 < end1 && start2 < end2){
          arr[start1] < arr[start2] ? arrB.push(arr[start1++]) : arrB.push(arr[start2++]);
        }
        while(start1 < end1){
          arrB.push(arr[start1++]);
        }
        while(start2 < end2){
          arrB.push(arr[start2++]);
        }
      }
      arr = arrB;
    }
    console.timeEnd("归并排序速度: ")
    return arr;
}

bubble(arr);
improveBubble(arr);
improveBubble2(arr);
selectionSort(arr);
insertSort(arr);
quickSort(arr);
console.timeEnd("快速排序速度: ");
mergeSort(arr);

/**
 * 冒泡排序速度: : 0.301ms
 * 加flag后冒泡排序速度: : 0.027ms
 * 记录位置后冒泡排序速度: : 0.067ms
 * 选择排序速度: : 0.045ms
 * 插入排序速度: : 0.030ms
 * 快速排序速度: : 0.017ms
 * 归并排序速度: : 0.052ms
 */