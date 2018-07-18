const btnLogout = document.getElementById("btn-logout");
const signIn = document.getElementById("sign-in");
const register = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("password");

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Inicio sesion')
    } else {
      console.log('no esta logueado')
    }
  });
}
register.addEventListener('click', () => {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function () {
      console.log('se creo el ususario')
    })
    .catch(function (error) {
      console.log(error.code, error.message)
    });
})
signIn.addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function () {
      console.log('ha iniciado sesion')
    })
    .catch(function (error) {
      console.log(error.code, error.message);
    });
})
btnLogout.addEventListener('click', () => {
})