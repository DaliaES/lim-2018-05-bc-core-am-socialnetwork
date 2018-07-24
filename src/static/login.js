const btnLogin = document.getElementById("btn-login");
const btnSignUp = document.getElementById("btn-signup");
const btnLogout = document.getElementById("btn-logout");
const signUpForm = document.getElementById("go-signup");
const btnGoogle = document.getElementById("btn-google");
const btnFacebook = document.getElementById("btn-facebook");


window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userName = user.displayName
      let userEmail = user.email
      document.getElementById("user-name").innerHTML = userName;
      document.getElementById("user-email").innerHTML = userEmail;
      console.log(user)
    } else {
      console.log('no esta logueado')
    }
  });
}
// agregar evento de login
btnLogin.addEventListener('click', e => {
  const email = document.getElementById("email-log").value;
  const pass = document.getElementById("password-log").value;

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(result => window.location.href = 'main.html')
    .catch(e => alert('No Iniciaste sesion correctamente o este usuario no existe, para ingresar Registrate'))
});
// ir a form signup
signUpForm.addEventListener('click', e => window.location.href = 'signup.html')
// agregar evento de signup
btnSignUp.addEventListener('click', e => {
  const email = document.getElementById("email-sign").value;
  const pass = document.getElementById("password-sign").value;
  const name = document.getElementById("id-name").value
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(firebaseUser => {
      const user = firebase.auth().currentUser
      if (user) {
        user.updateProfile({
          displayName: name,
        }).then(verification => {
          user.sendEmailVerification()
            .then(verification => {
              const divForm = document.getElementById("signup-form")
              divForm.innerHTML = '<span>Se te envio un mensaje de verificacion, revisa tu bandeja de entrada.Si se verifico tu correo correctamente </span>';
              pelement = document.createElement('p')
              pelement.innerHTML = 'Inicia Sesion'
              divForm.appendChild(pelement)
              pelement.addEventListener('click', action => window.location.href = 'index.html')
            }).catch(error => {
              console.log('hay un error')
            });
        })
      }
    })
    .catch(e => console.log(e.message));
})
// agregando evento de registro con google
btnGoogle.addEventListener('click', e => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html'
    }).catch(error => {
      alert('Hubo un error al Conectar')
    });
})
btnFacebook.addEventListener('click',e=>{
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    window.location.href = 'main.html'
  }).catch(function(error) {
    alert('Hubo un error al loguearse, puede que esta cuenta ya este registrada o no exista')

  });
})
btnLogout.addEventListener('click', e => {
  console.log('cerro sesion')
  // firebase.auth().signOut()
  //   .then(function () {
  //     console.log('cerro sesion')
  //   }).catch(function (error) {
  //     console.log('hubo un error')
  //   });

})