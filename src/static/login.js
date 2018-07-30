const btnLogin = document.getElementById("btn-login");
const btnSignUp = document.getElementById("btn-signup");
const btnLogout = document.getElementById("btn-logout");
const signUpForm = document.getElementById("go-signup");
const btnGoogle = document.getElementById("btn-google");
const btnFacebook = document.getElementById("btn-facebook");
let database = firebase.database()
let userConect = null;
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    let name = document.getElementById("user-name")
    let email= document.getElementById("user-email")
    let picProfile= document.getElementById("user-pic")
    if (user) {
      let userName = user.displayName
      let userEmail = user.email
      let userPic = user.photoURL
      name.innerHTML = userName;
      email.innerHTML = userEmail;
      if (userPic){
        picProfile.style.backgroundImage = "url("+userPic+")";
      }else{
        picProfile.style.backgroundImage = "url(https://image.ibb.co/h7ehKT/baseline_account_circle_black_48dp.png)";
      }
      addUserDataB(user.uid,user.displayName, user.email, user.photoURL)
    } else {
      console.log('no esta logueado')
    }
  });
}
// guardando en base de datos
let addUserDataB =(id,name,email,photo)=>{
  let addedUser = database.ref("/user"+ id).set({
    uid:id,
    username:name,
    email:email,
    profileimage:photo
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
  const img = document.getElementById("user-pic")
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
    .catch(e => alert('No se registro correctamente'));
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
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    window.location.href = 'main.html'

  }).catch(function(error) {
    alert('Hubo un error al loguearse, puede que esta cuenta ya este registrada o no exista')

  });
})
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut()
    .then(function () {
      window.location.href = 'index.html'
    }).catch(function (error) {
      console.log('hubo un error')
    });

})