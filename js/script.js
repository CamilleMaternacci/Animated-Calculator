// modal

const shadow = document.querySelector('.shadow')
const modal = document.querySelector('.info-modal')
const closeModalBtn = document.querySelector('.close-modal')

const closeModal = () => {
	shadow.style.display = 'none'
	modal.style.display = 'none'
}

closeModalBtn.addEventListener('click', closeModal)

// draggable panels

const lastCalculationsArea = document.querySelector('.last-calc-body')
const calculator = document.querySelector('.calculator-area')
const panelControl = document.querySelector('.panel-control')

let offsetX
let offsetY

const move = e => {
	panelControl.style.left = `${e.clientX - offsetX}px`
	panelControl.style.top = `${e.clientY - offsetY}px`
}

panelControl.addEventListener('mousedown', e => {
	offsetX = e.clientX - panelControl.offsetLeft
	offsetY = e.clientY - panelControl.offsetTop
	document.addEventListener('mousemove', move)
})

document.addEventListener('mouseup', () => {
	document.removeEventListener('mousemove', move)
})

//calculator area

const currentNumber = document.querySelector('.current-number')
const lastNumber = document.querySelector('.last-number')
const sign = document.querySelector('.sign')
const ac = document.querySelector('.ac')
const numbersBtns = document.querySelectorAll('.numbers')
const operatorsBtns = document.querySelectorAll('.operators')
const equals = document.querySelector('.equals')
const deleteOne = document.querySelector('.delete-one')
const allBtnsFromCalc = document.querySelectorAll('#btns-calc')

// last calculations area
const lastCalculations = document.querySelector('.last-calculations-area')
const lastCalculation = document.querySelector('.last-calculation')
const clearHistoryBtn = document.querySelector('.clear-history')

// panel-control btns

const calculationsBtn = document.querySelector('.btn-calculations')
const calculatorBtn = document.querySelector('.btn-calculator')
const panelBtn = document.querySelector('.btn-panel')
const allBtn = document.querySelector('.btn-all')

let result = ''

function displayNumbers() {
	if (this.textContent == '.' && currentNumber.innerHTML.includes('.')) return
	if (this.textContent == '.' && currentNumber.innerHTML == '') return (currentNumber.innerHTML = '0.')

	currentNumber.innerHTML += this.textContent
}

function operate() {
	if (currentNumber.innerHTML == '' && this.textContent == '-') {
		currentNumber.innerHTML = '-'
		return
	} else if (currentNumber.innerHTML == '-' && this.textContent == '-') {
		currentNumber.innerHTML = ''
		lastNumber.innerHTML = ''
	} else if (currentNumber.innerHTML == '') {
		return
	}

	if (sign.innerHTML !== '') {
		showResult()
	}
	lastNumber.innerHTML = currentNumber.innerHTML
	sign.innerHTML = this.textContent
	currentNumber.innerHTML = ''
}

function deletePreviousNumber() {
	let deletePrevious = deleteOne.innerHTML

	switch (deletePrevious) {
		case '<i class="fa-solid fa-delete-left"></i>':
			currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1)
			break
	}
}

function showResult() {
	if (lastNumber.innerHTML == '' || currentNumber.innerHTML == '') return

	let a = Number(currentNumber.innerHTML)
	let b = Number(lastNumber.innerHTML)
	let operator = sign.innerHTML

	switch (operator) {
		case '+' :
			result = a + b
			break

		case '-':
			result = b - a
			break

		case 'x':
			result = a * b
			break

		case '/':
			result = b / a
			break

		case 'x²':
			result = b ** a
			break
	}

	addToHistory()
	currentNumber.innerHTML = result
	lastNumber.innerHTML = ''
	sign.innerHTML = ''
}

document.addEventListener('keydown', event => {
	if(event.key == "Backspace") {
		currentNumber.innerHTML = currentNumber.innerHTML.slice(0,-1)
	} else if(event.key == '1') {
		currentNumber.innerHTML += '1'
	} else if(event.key == '2') {
		currentNumber.innerHTML += '2'
	} else if(event.key == '3') {
		currentNumber.innerHTML += '3'
	} else if(event.key == '4') {
		currentNumber.innerHTML += '4'
	} else if(event.key == '5') {
		currentNumber.innerHTML += '5'
	} else if(event.key == '6') {
		currentNumber.innerHTML += '6'
	} else if(event.key == '7') {
		currentNumber.innerHTML += '7'
	} else if(event.key == '8') {
		currentNumber.innerHTML += '8'
	} else if(event.key == '9') {
		currentNumber.innerHTML += '9'
	} else if(event.key == '0') {
		currentNumber.innerHTML += '0'
	} 
})

const addToHistory = () => {
	const newHistoryItem = document.createElement('span')
	newHistoryItem.innerHTML = `${lastNumber.innerHTML} ${sign.innerHTML} ${currentNumber.innerHTML} = ${result}`
	lastCalculations.append(newHistoryItem)
	newHistoryItem.classList.add('active-span')
}

const clearHistory = () => {
	lastCalculations.textContent = ''
}

const deleteAll = () => {
	result = ''
	currentNumber.textContent = ''
	sign.textContent = ''
	lastNumber.textContent = ''
}

operatorsBtns.forEach(button => button.addEventListener('click', operate))

numbersBtns.forEach(button => {
	button.addEventListener('click', displayNumbers)
})

deleteOne.addEventListener('click', deletePreviousNumber)
equals.addEventListener('click', showResult)
ac.addEventListener('click', deleteAll)
clearHistoryBtn.addEventListener('click', clearHistory)

// animations

const turnAnimationCalculator = () => {
	allBtnsFromCalc.forEach(btns => {
		btns.classList.toggle('btns-animation')
	})

	calculator.classList.toggle('calculator-animation')
	calculatorBtn.classList.toggle('active-control-btn')
}

const turnAnimationCalculations = () => {
	lastCalculationsArea.classList.toggle('calculator-animation')
	calculationsBtn.classList.toggle('active-control-btn')
}

const turnAnimationPanel = () => {
	panelControl.classList.toggle('panel-control-animation')
	panelBtn.classList.toggle('active-control-btn')
}

const turnAnimationAll = () => {
	resetAnimation()
	turnAnimationCalculator()
	turnAnimationCalculations()
	turnAnimationPanel()
	allBtn.classList.toggle('active-control-btn')
}

const resetAnimation = () => {
	calculator.classList.remove('calculator-animation')
	calculatorBtn.classList.remove('active-control-btn')
	lastCalculationsArea.classList.remove('calculator-animation')
	calculationsBtn.classList.remove('active-control-btn')
	panelControl.classList.remove('panel-control-animation')
	panelBtn.classList.remove('active-control-btn')
}

const checkAnimation = () => {
	if (
		calculator.classList.contains('calculator-animation') ||
		lastCalculationsArea.classList.contains('calculator-animation') ||
		panelControl.classList.contains('panel-control-animation')
	) {
		resetAnimation()
	} else {
		turnAnimationAll()
	}
}

calculatorBtn.addEventListener('click', turnAnimationCalculator)
calculationsBtn.addEventListener('click', turnAnimationCalculations)
panelBtn.addEventListener('click', turnAnimationPanel)
allBtn.addEventListener('click', checkAnimation)

// keyboard event
