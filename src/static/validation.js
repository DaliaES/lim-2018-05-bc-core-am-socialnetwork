window.validatesignForm = (name, email, pass) => {
	const regEx = /\S+@\S+\.\S+/;
	if (name !== '' & pass !== '' & email !== '') {
		return true;
	} else {
		alert('Por favor Ingrese sus Datos Completos');
	}
	if (regEx.test(email)) {
		return true;
	}
	if (pass.length >= 6) {
		return true;
	}
	return false;
}
window.validateloginForm = (email, pass) => {
	const regEx = /\S+@\S+\.\S+/;
	if (pass !== '' & email !== '') {
		return true;
	} else {
		alert('Por favor Ingrese sus datos de registro correcto');
	}
	if (regEx.test(email)) {
		return true;
	}
	if (pass.length >= 6) {
		return true;
	}
	return false;
}
