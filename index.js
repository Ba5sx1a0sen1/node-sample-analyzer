let fs = require('fs')
let fileName = process.argv[2]//保存文件名
if (!fileName) {
	console.log('请输入文件名，比如 node index.js txt.txt')
	process.exit(1)//退出程序
}
let str = fs.readFileSync(fileName, 'utf8').replace(/\n/g, ' ')
let array = str.split(' ').filter(input => input)
while (true) {//删掉注释先
	if (array.indexOf('/*') === -1) {
		break
	}
	if (array.indexOf('/*') !== -1) {//如果找到了注释符号的起始符号
		if (array.indexOf('*/') !== -1) {//既找到开始符又找到结束符，name删掉
			array.splice(array.indexOf('/*'), array.indexOf('*/') - array.indexOf('/*') + 1)//去掉注释		
		} else {//没找到结束符号，暴力全删
			array.splice(array.indexOf('/*'))
		}
	}
	if (array.indexOf('/*') === -1 && array.indexOf('*/') !== -1) {
		throw new Error('你他妈瞎注释')
	}
}
let printArray = []
let countArray = []
let constantArr = []
let printStr = ''
let people = [{
	name: '路高乐',
	number: '2015081086',
	banji: '15医工计算机4'
}, {
	name: '蔡宇森',
	number: '2015081004',
	banji: '15医工计算机4'
}, {
	name: '陈国锋',
	number: '2015081016',
	banji: '15医工计算机4'
}]
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
function singleChar(str, flag) {
	if (!flag) {
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
function doubleChar(str, flag) {
	if (!flag) {
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
function isInReserve(str) {
	let flag = false
	if (wordHashCode.hasOwnProperty(str)) {
		flag = true
	}
	return flag
}
console.log(`姓名：${people[0].name} 班级：${people[0].banji} 学号：${people[0].number}`)
console.log(`姓名：${people[1].name} 班级：${people[1].banji} 学号：${people[1].number}`)
console.log(`姓名：${people[2].name} 班级：${people[2].banji} 学号：${people[2].number}\n`)
//console.log(str)
//console.log(array)
for (let i = 0; i < array.length; i++) {
	let mayReservedWord = false
	let current = array[i]
	let obj = {} //用来记录
	if (wordHashCode.hasOwnProperty(current)) {
		obj.code = wordHashCode[current]
		obj.mark = '-'
		mayReservedWord = true
	} else {
		if (isNumber(current)) {
			obj.code = 37
			if (constantArr.indexOf(current) === -1) {
				constantArr.push(current)
				obj.mark = constantArr.length
			} else {
				obj.mark = constantArr.indexOf(current) + 1
			}
		} else if (isIdentifier(current)) {
			obj.code = 36
			if (constantArr.indexOf(current) === -1) {
				constantArr.push(current)
				obj.mark = constantArr.length
			} else {
				obj.mark = constantArr.indexOf(current) + 1
			}
		}
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
	let firstSingleQuoteIndex = -1//第一个单引号的位置
	let secondSingleQuoteIndex = -1//第二个单引号的位置	
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
			} else if (currentChar === "'") {//等于一个单引号 这里他妈本来是要在下面的，写着写着就上来了
				// console.log('可能是字符串',currentChar,currentStr) 
				mayStr = true
				if (firstSingleQuoteIndex === -1 && secondSingleQuoteIndex === -1) {
					firstSingleQuoteIndex = j
				} else if (firstSingleQuoteIndex !== -1 && secondSingleQuoteIndex === -1) {
					secondSingleQuoteIndex = j
				}
				//上面两个if先记录两个单引号的位置，以前以后，下面再进行传入，然后再重置
				if (firstSingleQuoteIndex !== -1 && secondSingleQuoteIndex !== -1) {
					// console.log(current.substring(firstSingleQuoteIndex,secondSingleQuoteIndex+1))
					let saveStr = current.substring(firstSingleQuoteIndex, secondSingleQuoteIndex + 1)
					let strObj = {}
					strObj.code = 38
					if (constantArr.indexOf(saveStr) === -1) {
						constantArr.push(saveStr)
						strObj.mark = constantArr.length
					} else {
						strObj.mark = constantArr.indexOf(saveStr) + 1
					}
					printArray.push(strObj)

					firstSingleQuoteIndex = -1
					secondSingleQuoteIndex = -1
				}
			}
			//简单的单界符号先判断出来，先避开可能和后一个符号合成双界符的情况
			// console.log(currentChar)
			//可能要进行很暴力的各种循环判断？
			//要设置一个很牛逼的标志位，遇到界符再把那一段字符进行循环比较，再循环比较后要记得设置回false，并且下一次的关键索引要设置往下一个			
			// console.log(currentStr)

			let obj2 = {}
			let innerReservedWord = false//内层判断是保留字，不要做判断标识符和数字，字符串的判断
			//没遇到界符，第二个测试用例的字符串后无分号进不来这里
			if (isMeetDelimiter) {
				// console.log(currentStr, '遇到了界符我是这个字符串')
				isMeetDelimiter = false
				//现在的情况是遇到界符就会搞，要内层进行单界符和双界符的判断，不然判断到了他妈是界符就瞎搞，无视了双界符，或者在上面让循环变量自增
				for (key2 in wordHashCode) {//扫他娘的表，看是不是保留字先
					// console.log(currentStr,key2)
					if (key2 === currentStr) {
						obj2.code = wordHashCode[currentStr]
						obj2.mark = '-'
						// console.log('前面这两步操作我确实做了，别打我',obj2)						
						// mayReservedWord = true
						printArray.push(obj2)
						innerReservedWord = true
						break
					}
				}
				if (!innerReservedWord) {
					// console.log(currentStr)
					if (isNumber(currentStr)) {
						obj2.code = 37
						if (constantArr.indexOf(currentStr) === -1) {
							constantArr.push(currentStr)
							obj2.mark = constantArr.length
						} else {
							obj2.mark = constantArr.indexOf(currentStr) + 1
						}
						printArray.push(obj2)
					} else if (isIdentifier(currentStr)) {
						obj2.code = 36
						if (constantArr.indexOf(currentStr) === -1) {
							// console.log('找不到')
							// console.log(currentStr,constantArr)
							constantArr.push(currentStr)
							obj2.mark = constantArr.length
						} else {
							obj2.mark = constantArr.indexOf(currentStr) + 1
						}
						printArray.push(obj2)
					}
					//这里判断字符串错了，要在上面判断，单引号那里
					// else{//就是字符串了
					// 	obj2.code = 38						
					// 	if(constantArr.indexOf(currentStr)===-1){
					// 		constantArr.push(currentStr)
					// 		obj2.mark = constantArr.length
					// 	}else{
					// 		obj2.mark = constantArr.indexOf(currentStr)+1
					// 	}
					// 	printArray.push(obj2)
					// }
				}
				innerReservedWord = false
			}
			singleChar(singleStr, isSingle)//往后移动，把前面的先比对好在存入界符进打印数组	
			doubleChar(doubleStr, isDouble)
			isSingle = false
			isDouble = false
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
// console.log(constantArr)
console.log(printStr)
