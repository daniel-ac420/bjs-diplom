"use strict";

/* --- Выход из личного кабинета --- */
const logoutButton = new LogoutButton();

logoutButton.action = function() {
	ApiConnector.logout(function response() {
		if (response) {
			location.reload();
		}
	})
}



/* --- Получение информации о пользователе --- */
ApiConnector.current((responce) => {
	if (responce) {
		ProfileWidget.showProfile(responce.data);
	}
})



/* --- Получение текущих курсов валюты --- */
let ratesBoard = new RatesBoard();

let currentExchangeRate = function() {
	ApiConnector.getStocks((responce) => {
		if (responce) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(responce.data);
		}
	})
}

currentExchangeRate();
setInterval(currentExchangeRate, 60000);



/* --- Операции с деньгами --- */
let moneyManager = new MoneyManager();

/* --- Пополнение баланса --- */

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, checkMoneyStatus);
}

/* --- Конвертирование валюты --- */

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, checkMoneyStatus);
}


/* --- Перевод валюты --- */

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, checkMoneyStatus);
}


/* --- Общая функция для операций с валютой --- */
function checkMoneyStatus(arg) {
	if (arg.success) {
		ProfileWidget.showProfile(arg.data);
		moneyManager.setMessage(true, "Операция проведена успешно");
	} else {
		moneyManager.setMessage(false, arg.error);
	}
}



/* --- Работа с избранным --- */

let favoritesWidget = new FavoritesWidget();

/* --- Запрос начального списка избранного --- */

ApiConnector.getFavorites(function(responce) {
	if (responce) {
		createList(responce.data);
	}
})


/* --- Добавление пользователя в список избранных --- */

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, function(responce) {
		checkUser(responce);
	})
}


/* --- Удаление пользователя из избранного --- */

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, function(responce) {
		checkUser(responce);
	})
}


/* --- Общие функции для работы с избранным --- */

function createList(arg) {
	favoritesWidget.clearTable();
	favoritesWidget.fillTable(arg);
	moneyManager.updateUsersList(arg);
}

function checkUser(arg) {
	if (arg.success) {
		createList(arg.data);
		favoritesWidget.setMessage(true, "Операция проведена успешно");
	} else {
		favoritesWidget.setMessage(false, arg.error);
	}
}