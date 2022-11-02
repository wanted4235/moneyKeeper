let startBtn = document.getElementById('start'), //Начать расчёт - кнопка
	budgetValue = document.getElementsByClassName('budget-value')[0], //Доход
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0], //Бюджет на 1 день
	levelValue = document.getElementsByClassName('level-value')[0], //Уровень дохода
	expensesValue = document.getElementsByClassName('expenses-value')[0], //Обязательные расходы
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], //Возможные траты
	incomeValue = document.getElementsByClassName('income-value')[0], //Доролнительный доход
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0], //накопления за 1 месяц
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0]; //накопления за 1 год

let expensesItem = document.getElementsByClassName('expenses-item'), //input обязательных расходов
	expensesBtn = document.getElementsByTagName('button')[0], //утвердить обязательные расходы
	optionalExpensesBtn = document.getElementsByTagName('button')[1], //утвердить необязательные расходы
	calcBtn = document.getElementsByTagName('button')[2], //расчитать
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'), //поля ввода необязательных расходов
	incomeItem = document.querySelector('#income'), //статьи возможных доходов
	checkSavings = document.querySelector('#savings'), //есть ли накопления?
	sumValue = document.querySelector('#sum'), //сумма
	percentValue = document.querySelector('#percent'), //процент
	yearValue = document.querySelector('.year-value'), //год
	monthValue = document.querySelector('.month-value'), //месяц
	dayValue = document.querySelector('.day-value'); //день

let money, date;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
calcBtn.disabled = true;

//функция инициализации бюджета и даты расчёта
startBtn.addEventListener('click', function () {
	date = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц в рублях?", "");

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц в рублях?", "");
	}
	appData.budget = money;
	appData.timeData = date;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(date)).getFullYear();
	monthValue.value = new Date(Date.parse(date)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(date)).getDate();

	expensesBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	calcBtn.disabled = false;
});

//событие ввода обязательных расходов в месяц
expensesBtn.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;

		if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
			console.log('done');
			appData.expenses[a] = b;
			sum += +b;
		} else {
			console.log('Неверный формат данных');
			i--;
		}
	}

	expensesValue.textContent = sum;
});

//Возможные статьи необязательных расчётов
optionalExpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

//Расчёт ежедневного бюджета
calcBtn.addEventListener('click', function () {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
		//Блок кода с расчетом уровня достатка
		if (appData.moneyPerDay <= 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		}
		else {
			levelValue.textContent = "Неверный тип данных";
		}
	} else {
		dayBudgetValue.textContent = 'Произошла ошибка!';
	}
});

//Ввод через запятую возможных статей дохода
incomeItem.addEventListener('input', function () {
	let answ = incomeItem.value;
	appData.income = answ.split(',');
	incomeValue.textContent = appData.income;
});

//Есть ли накопления?
checkSavings.addEventListener('click', function () {
	if (appData.savings == true)
		appData.savings = false;
	else
		appData.savings = true;
});

//Расчёт накоплений в месяц с вклада
sumValue.addEventListener('input', function () {
	if (appData.savings) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function () {
	if (appData.savings) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

//Объект счёта
let appData = {
	budget: money,
	timeData: date,
	expenses: {}, //обязательные расходы
	optionalExpenses: {}, //необязательные расходы
	income: [],
	savings: false,
};