//0,1,1,2,3,5,8,..., ((n-1) + (n-2)) 求第n项

function fib(n){
    let i = 0;
    let j = 1;
    while( n -- > 0){
        j = j + i;
        i = j - i; 
    }
    return i;
}