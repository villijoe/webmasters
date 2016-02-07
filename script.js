// JavaScript Document

function showPass() {
	var checkbox = document.getElementById("checkbox"),
	    password = document.getElementById("password");
	if (checkbox.checked) {
		password.setAttribute('type', 'text');
	} else {
		password.setAttribute('type', 'password');
	}
}

function regToLog(state, obj) {
	var formName = document.getElementById("form").name,
		btnSubmit = document.getElementById("submit"),
		form = document.getElementById("form"),
		btnRegister = document.getElementById("btnRegister"),
		btnLogin = document.getElementById("btnLogin"),
		inputEmail = document.getElementById("email"),
		span = document.getElementById("busy");
	if (state === formName) {
		console.log("it's equal");
	} else {
		if (state === 'login') {
			obj.setAttribute('class', 'click');
			btnRegister.setAttribute('class', 'no_click');
			inputEmail.removeAttribute('onBlur');
			if(form.lang === 'ru') {
				btnSubmit.setAttribute('value', ru.btnSubmitLogin);
			} else {
				btnSubmit.setAttribute('value', 'Log In');
			}
			if (span.childNodes[0]) {
				var child = span.childNodes[0];
				span.removeChild(child);
			}
		} else {
			obj.setAttribute('class', 'click');
			btnLogin.setAttribute('class', 'no_click');
			inputEmail.setAttribute('onBlur', 'busyOrNot(this);');
			if (form.lang === 'ru') {
				btnSubmit.setAttribute('value', ru.btnSubmitRegister);
			} else {
				btnSubmit.setAttribute('value', 'Registration');
			}
			busyOrNot(inputEmail);
		}
	}
}

function changeLang(state, obj) {
	var formLang = document.getElementById("form"),
		btnRu = document.getElementById("btnRu"),
		btnEn = document.getElementById("btnEn");
	if (state === formLang.lang) {
		console.log("it's equal lang");
	} else {
		if (state === 'ru') {
			changeFormLang(ru);
			obj.setAttribute('class', 'click');
			btnEn.setAttribute('class', 'no_click');
			formLang.setAttribute('lang', 'ru');
		} else {
			changeFormLang(en);
			obj.setAttribute('class', 'click');
			btnRu.setAttribute('class', 'no_click');
			formLang.setAttribute('lang', 'en');
		}
	}
}

function changeFormLang(obj){
	var btnRegister = document.getElementById("btnRegister"),
		btnLogin = document.getElementById("btnLogin"),
		textEmail = document.getElementById("textEmail"),
		textPassword = document.getElementById("textPassword"),
		btnSubmit = document.getElementById("submit");
	btnRegister.innerHTML = obj.btnRegister;
	btnLogin.innerHTML = obj.btnLogin;
	textEmail.innerHTML = obj.textEmail;
	textPassword.innerHTML = obj.textPassword;
	if (btnSubmit.value === 'Registration' || btnSubmit.value === 'Зарегистрироваться'){
		btnSubmit.setAttribute('value', obj.btnSubmitRegister);
	} else {
		btnSubmit.setAttribute('value', obj.btnSubmitLogin);
	}
}

function busyOrNot(obj){
	var xhr = new XMLHttpRequest(),
		value = obj.value;
		request = 'busy='+value,
		span = document.getElementById("busy"),
		button = document.getElementById("submit");
	xhr.open("POST", "handle.php", true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				var response = xhr.responseText;
				if(response === 'busy'){
					span.innerHTML = "Busy";
					button.setAttribute('type', 'button');
				} else if (response === '' && (span.childNodes[0])){
					var child = span.childNodes[0];
					span.removeChild(child);
					button.setAttribute('type', 'submit');
				}
			}
		}
	}
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf8');
	xhr.send(request);
}