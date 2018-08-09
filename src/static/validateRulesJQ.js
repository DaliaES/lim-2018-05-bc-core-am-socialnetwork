$().ready(function () {
	$('#login-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6,
			}
		},
		messages: {
			email: {
				required: 'Escribe un email',
				email: 'Este email no es válido'
			},
			password: {
				required: 'Escribe una contraseña',
				minlength: 'Ingresa al menos 6 caracteres'
			}
		}
	})
	$('#signup-form').validate({
		rules: {
			name: {
				required: true,
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6,
			}
		},
		messages: {
			name: {
				required: 'Escribe un nombre de Usuario',
			},
			email: {
				required: 'Escribe un email',
				email: 'Este email no es válido',
			},
			password: {
				required: 'Escribe una contraseña',
				minlength: 'Ingresa al menos 6 caracteres',
			}
		}
	})
})