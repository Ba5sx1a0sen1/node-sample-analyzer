let fs = require('fs')
let str = fs.readFileSync('txt.txt', 'utf8').replace(/\n/g, ' ')
let array = str.split(' ').filter(input => input)
let printArray = []
let printStr = ''
let people = {
	name: '百威',
	number: '2015081086',
	banji: '15医工计算机4'
}
const wordHashCode = {
	'and': 1,
	'array': 2,
	'begin': 3,
	'bool': 4,
	'call': 5, 'case': 6, 'char': 7, 'constant': 8, 'dim': 9, 'do': 10, 'else': 11, 'end': 12, 'false': 13, 'for': 14, 'if': 15, 'input': 16, 'integer': 17, 'not': 18, 'of': 19, 'or': 20, 'output': 21, 'procedure': 22, 'program': 23, 'read': 24, 'real': 25, 'repeat': 26, 'set': 27, 'stop': 28, 'then': 29, 'to': 30, 'true': 31, 'until': 32, 'var': 33, 'while': 34, 'write': 35, '标识符': 36, '整数': 37, '字符常数': 38, '(': 39, ')': 40, '*': 41, '*/': 42, '+': 43, ',': 44, '-': 45, '.': 46, '..': 47, '/': 48, '/*': 49, ':': 50, ':=': 51, ';': 52, '<': 53, '<=': 54, '<>': 55, '=': 56, '>': 57, '>=': 58, '[': 59, ']': 60
}
function isNumber(str) {
    var reg=/^\d+$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}
function isIdentifier(str){
	var reg=/^[A-Za-z0-9_]+$/
	return reg.test(str)
}


console.log(`姓名：${people.name} 班级：${people.banji} 学号：${people.number}`)
//console.log(str)
//console.log(array)
for (let i = 0; i < array.length; i++) {
	let current = array[i]
	let obj = {} //用来记录
	for (key in wordHashCode) {
		if (key === current) {
			obj.code = wordHashCode[current]
			obj.mark = '-'
			break
		}else{
			obj.code = current
			if(isNumber(current)){
				obj.mark = 'number'
			}else if(isIdentifier(current)){
				obj.mark = 'identifier'
			}else{
				obj.mark = 'string'
			}
			// obj.mark = isIdentifier(current)?'number':'几把'
		}//进行标识符，数字，字符串的判断
	}
	printArray.push(obj)
}
for (let i = 0; i < printArray.length; i++) {
	// console.log(`(${printArray[i].code},${printArray[i].mark})`)
	printStr += `(${printArray[i].code},${printArray[i].mark}) `
	if ((i + 1) % 5 === 0) {
		// console.log('\n')
		printStr += '\n' 
	}
}
console.log(printStr)
