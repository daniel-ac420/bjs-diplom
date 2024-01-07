"use strict";

const userForm = new UserForm();

/* --- Авторизация --- */
//userForm.loginFormCallback = function(data) {
//	ApiConnector.login(data, function response() {
//		if (response.success) {
//			location.reload();
//		} else {
//			userForm.setLoginErrorMessage(response.error);
//		}
//	})
//}

/* --- через стрелочную функцию --- */
userForm.loginFormCallback = function(data) {
	ApiConnector.login(data, response => {
		if (response.success) {
			location.reload();
		} else {
			this.setLoginErrorMessage(response.error);
		}
	})
}



/* --- Регистрация --- */
userForm.registerFormCallback = function(data) {
	ApiConnector.register(data, response => {
		if (response.success) {
			location.reload();
		} else {
			this.setLoginErrorMessage(response.error);
		}
	})
}


//ApiConnector.login({login: "ivan@demo.ru", password: "password"}, response => console.log(response));
//ApiConnector.login({login: "ivan@demo.ru", password: "demo"}, response => console.log(response));