const signUpForm = document.getElementById("go-signup");
// ir a form signup
signUpForm.addEventListener('click', e => window.location.href = 'signup.html')

const ShowMsgVerification=()=>{
    const divForm = document.getElementById("signup-form")
    divForm.innerHTML = '<span>Se te envio un mensaje de verificacion, revisa tu bandeja de entrada.Si se verifico tu correo correctamente </span>';
    msgVerification = document.createElement('p')
    msgVerification.innerHTML = 'Inicia Sesion'
    divForm.appendChild(msgVerification)
    msgVerification.addEventListener('click', action => window.location.href = 'index.html')
   }