const loginEmail = document.getElementById("email-log");
const loginPass = document.getElementById("password-log");
const btnLogin = document.getElementById("btn-login");
const btnSignUp = document.getElementById("btn-signup");
const btnSignOut = document.getElementById("btn-signout");
const signEmail = document.getElementById("email-sign");
const signPass = document.getElementById("password-sign");
const signUpForm = document.getElementById("go-signup")
const divForm = document.getElementById("signup-form")

window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)
    } else {
      console.log('no esta logueado')
    }
  });
}

// agregar evento de login
btnLogin.addEventListener('click', e => {
  const email = loginEmail.value;
  const pass = loginPass.value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(result => window.location.href = 'main.html')
    .catch(e => alert('No Iniciaste sesion correctamente o este usuario no existe, para ingresar Registrate'))
});
// ir a form signup
signUpForm.addEventListener('click', e => window.location.href = 'signup.html')
// agregar evento de signup
btnSignUp.addEventListener('click', e => {
  const email = signEmail.value;
  const pass = signPass.value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(result => window.location.href = 'main.html')
    .catch(e => console.log(e.message));
})
// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if (firebaseUser) {
//     console.log(firebaseUser);
//   } else {
//     alert('no logueado')
//     console.log('no logueado');
//   }

