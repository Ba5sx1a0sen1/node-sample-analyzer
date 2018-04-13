let fs = require('fs')
let str = fs.readFileSync('txt3.txt', 'utf8').replace(/\n/g, ' ')
let array = str.split(' ').filter(input => input)
let printArray = []
let countArray = []
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
	var reg = /^\d+$/;   /*定义验证表达式*/
	return reg.test(str);     /*进行验证*/
}
function isIdentifier(str) {
	var reg = /^[A-Za-z0-9_]+$/
	return reg.test(str)
}
function singleChar(str,flag) {
	if(!flag){
		return false
	}
	switch (str) {
		case '+':
			printArray.push({ code: 43, mark: '-' })
			break
		case '-':
			printArray.push({ code: 45, mark: '-' })
			break
		case '*':
			printArray.push({ code: 41, mark: '-' })
			break
		case '/':
			printArray.push({ code: 48, mark: '-' })
			break
		case '=':
			printArray.push({ code: 56, mark: '-' })
			break
		case '<':
			printArray.push({ code: 53, mark: '-' })
			break
		case '>':
			printArray.push({ code: 57, mark: '-' })
			break
		case '(':
			printArray.push({ code: 39, mark: '-' })
			break
		case ')':
			printArray.push({ code: 40, mark: '-' })
		case '[':
			printArray.push({ code: 59, mark: '-' })
			break
		case ']':
			printArray.push({ code: 60, mark: '-' })
			break
		case ':':
			printArray.push({ code: 50, mark: '-' })
			break
		case '.':
			printArray.push({ code: 46, mark: '-' })
			break
		case ';':
			printArray.push({ code: 52, mark: '-' })
			break
		case ',':
			printArray.push({ code: 44, mark: '-' })
			break
	}
}
function doubleChar(str,flag) {
	if(!flag){
		return false
	}
	switch (str) {
		case '<>':
			printArray.push({ code: 55, mark: '-' })
			break
		case '<=':
			printArray.push({ code: 54, mark: '-' })
			break
		case '>=':
			printArray.push({ code: 58, mark: '-' })
			break
		case ':=':
			printArray.push({ code: 51, mark: '-' })
			break
		case '..':
			printArray.push({ code: 47, mark: '-' })
			break
	}
}

console.log(`姓名：${people.name} 班级：${people.banji} 学号：${people.number}`)
//console.log(str)
//console.log(array)
for (let i = 0; i < array.length; i++) {
	let mayReservedWord = false
	let current = array[i]
	let obj = {} //用来记录
	for (key in wordHashCode) {
		if (key === current) {
			obj.code = wordHashCode[current]
			obj.mark = '-'
			mayReservedWord = true
			break
		} else {
			if (isNumber(current)) {
				obj.code = current
				obj.mark = 'number'
			} else if (isIdentifier(current)) {
				obj.code = current
				obj.mark = 'identifier'
			} else {
				// obj.mark = 'string'
				//判断到不是数字也不是标识符，这里进行很严格的判断
				//放在这里错啦，要放到再外面一层循环
				// for (let j = 0, length = current.length; j < length; j++) {
				// 	let currentChar = current.substr(j, 1) //每次取出一个字符进行比较
				// 	//简单的单界符号先判断出来，先避开可能和后一个符号合成双界符的情况
				// 	// console.log(currentChar)					
				// 	singleChar(currentChar)
				// }
			}
			// obj.mark = isIdentifier(current)?'number':'几把'
		}//进行标识符，数字，字符串的判断
	}

	//初步按空格分离扫表不是保留字的话，进行下面的骚操作
	let keyIndex = 0
	let mayStr = false
	let mayIdentifier = false
	let mayNum = false
	let isMeetDelimiter = false //判断是否遇到界符，遇到后做操作记得改回false，下面两个界符判断也一样
	let isSingle = false //是不是单界符
	let isDouble = false //是不是双界符
	let doubleStr = '' //声明双界符存储量
	let singleStr = ''//声明单界符存储量
	if (!mayReservedWord) {
		for (let j = 0, length = current.length; j < length; j++) {
			let currentChar = current.substr(j, 1) //每次取出一个字符进行比较
			let currentStr = current.substring(keyIndex, j + 1)//啦啦啦
			if (currentChar === '+' ||
				currentChar === '-' ||
				currentChar === '*' ||
				currentChar === '/' ||
				currentChar === '=' ||
				currentChar === '<' ||
				currentChar === '>' ||
				currentChar === '(' ||
				currentChar === ')' ||
				currentChar === '[' ||
				currentChar === ']' ||
				currentChar === ':' ||
				currentChar === '.' ||
				currentChar === ';' ||
				currentChar === ',') {
				isMeetDelimiter = true//不管是单界符还是双界符，先设置表明遇到了界符
				currentStr = current.substring(keyIndex, j)//啦啦啦，要去掉1不然就废了包含了界符	
				//关键索引要往后面移动，先判断移动到j后面是不是界符
				keyIndex = j + 1
				//非常的nice呢，如果不是界符就直接往后走啦。如果是双界符，哼哼，有点意思，那就再往后走
				if (currentChar === '<' && current.substr(keyIndex, 1) === '=') {
					doubleStr = currentChar + current.substr(keyIndex, 1)
					//加起来doublestr就是双界符
					isDouble = true//那么就是双界符
					keyIndex++ //既然是双界符了，判断完了keyindex可以往下走了
					j++//这步操作很骚很骚，就是拿来跳过双界符的
					//跳过这个双界符后后面如果还有界符老子就tm不干了，那就是你的语法错误啦啦啦
				} else if (currentChar === '<' && current.substr(keyIndex, 1) === '>') {
					doubleStr = currentChar + current.substr(keyIndex, 1)
					isDouble = true//那么就是双界符
					keyIndex++ //既然是双界符了，判断完了keyindex可以往下走了
					j++
				} else if (currentChar === '>' && current.substr(keyIndex, 1) === '=') {
					doubleStr = currentChar + current.substr(keyIndex, 1)
					isDouble = true//那么就是双界符
					keyIndex++ //既然是双界符了，判断完了keyindex可以往下走了
					j++
				} else if (currentChar === ':' && current.substr(keyIndex, 1) === '=') {
					doubleStr = currentChar + current.substr(keyIndex, 1)
					isDouble = true//那么就是双界符
					keyIndex++ //既然是双界符了，判断完了keyindex可以往下走了
					j++
				} else if (currentChar === '.' && current.substr(keyIndex, 1) === '.') {
					doubleStr = currentChar + current.substr(keyIndex, 1)
					isDouble = true//那么就是双界符
					keyIndex++ //既然是双界符了，判断完了keyindex可以往下走了
					j++
				} else {
					//如果不是以上的情况，那就可以很明确他是单界符了，keyindex前面也已经往下走了，所以这里不用再往下走
					singleStr = currentChar
					isSingle = true
				}
				// console.log('是什么呢，此时这个j是多少呢',j,current[j],keyIndex,current[keyIndex])	
			}
			//简单的单界符号先判断出来，先避开可能和后一个符号合成双界符的情况
			// console.log(currentChar)
			//可能要进行很暴力的各种循环判断？
			//要设置一个很牛逼的标志位，遇到界符再把那一段字符进行循环比较，再循环比较后要记得设置回false，并且下一次的关键索引要设置往下一个			
			// console.log(currentStr)

			let obj2 = {}
			if (isMeetDelimiter) {
				console.log(currentStr, '遇到了界符我是这个字符串')
				isMeetDelimiter = false
				//现在的情况是遇到界符就会搞，要内层进行单界符和双界符的判断，不然判断到了他妈是界符就瞎搞，无视了双界符，或者在上面让循环变量自增
				for (key2 in wordHashCode) {//扫他娘的表，看是不是保留字先
					console.log(currentStr,key2)
					if (key2 === currentStr) {
						obj2.code = wordHashCode[currentStr]
						obj2.mark = '-'
						console.log('前面这两步操作我确实做了，别打我',obj2)						
						// mayReservedWord = true
						printArray.push(obj2)
						break
					}
				}
				if (isNumber(currentStr)) {
					obj2.code = currentStr
					obj2.mark = 'number'
					printArray.push(obj2)
				} else if (isIdentifier(currentStr)) {
					obj2.code = currentStr
					obj2.mark = 'identifier'
					if(currentStr==='integer'){
						console.log('操你妈')
					}
					printArray.push(obj2)
				}
			}
			singleChar(singleStr,isSingle)//往后移动，把前面的先比对好在存入界符进打印数组	
			doubleChar(doubleStr,isDouble)
			isSingle=false
			isDouble=false
			// console.log(currentChar,currentChar==="'")  可以找到单引号
		}
	}
	if (JSON.stringify(obj) !== '{}') {
		printArray.push(obj)
	}
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
