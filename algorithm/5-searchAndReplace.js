/**
 * 使用给定的参数对句子执行一次查找和替换，然后返回新句子。
 * 第一个参数是将要对其执行查找和替换的句子。
 * 第二个参数是将被替换掉的单词（替换前的单词）。
 * 第三个参数用于替换第二个参数（替换后的单词）。
 * 注意：替换时保持原单词的大小写。例如，如果你想用单词 "dog" 替换单词 "Book" ，你应该替换成 "Dog"。
 */

function myReplace(str, before, after) {
    let _afterArr = after.split('');
 
    _afterArr[0] = /[A-Z]/.test(before[0]) ? _afterArr[0].toUpperCase() : _afterArr[0].toLowerCase();

    return str.replace(before,_afterArr.join(''));
}
  
console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "Leaped")); //A quick brown fox leaped over the lazy dog
console.log(myReplace("His name is Tom", "Tom", "john")) // His name is John