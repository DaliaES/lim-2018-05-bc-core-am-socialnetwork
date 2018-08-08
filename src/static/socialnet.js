const btnLogout = document.getElementById("btn-logout");
const btnFacebook = document.getElementById("btn-facebook");
let database = firebase.database();
let auth =   firebase.auth();
let userConect = null;
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    let name = document.getElementById("user-name")
    let email = document.getElementById("user-email")
    let picProfile = document.getElementById("user-pic")
    if (user) {
      let userName = user.displayName
      let userEmail = user.email
      let userPic = user.photoURL
      name.innerHTML = userName;
      email.innerHTML = userEmail;
      if (userPic) {
        picProfile.style.backgroundImage = "url(" + userPic + ")";
      } else {
        picProfile.style.backgroundImage = "url(https://image.ibb.co/h7ehKT/baseline_account_circle_black_48dp.png)";
      }
      addUserDataB(user.uid, user.displayName, user.email, user.photoURL)
      //timelinePost()
    } else {
      console.log('no esta logueado')
    }
  });

};
// funcion para guardar datos en database
let addUserDataB = (id, name, email, photo) => {
  let addedUser = database.ref("/users/" + id).set({
    uid: id,
    username: name,
    email: email,
    profileimage: photo
  });
}
// funcion de logueo
const Login =()=>{
  const email = document.getElementById("email-log").value;
  const pass = document.getElementById("password-log").value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(result => window.location.href = 'main.html')
    .catch(e => alert('No Iniciaste sesion correctamente o este usuario no existe'))
}
// funcion de registro
const registro =()=>{
  const email = document.getElementById("email-sign").value;
  const pass = document.getElementById("password-sign").value;
  const name = document.getElementById("id-name").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(firebaseUser => {
      const user = firebase.auth().currentUser
      if (user) {
        user.updateProfile({
          displayName: name,
        })
        emailVerification()
      }
    })
    .catch(e => alert('No se registro correctamente'));
}
// funcion para enviar email de verificacion
window.emailVerification = () => {
  const user = firebase.auth().currentUser
  user.sendEmailVerification()
    .then(result => {
      ShowMsgVerification()
    })
    .catch(error => {
      console.log('hay un error')
    })
}
// funcion para logueo con google
const googleLogin =()=>{
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html'
    }).catch(error => {
      alert('Hubo un error al Conectar')
    });
}
//  funcion de logueo facebook
const loginFacebook=()=>{
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html'
    }).catch(error => {
      console.log(error.code,error.message)
      alert('Hubo un error al loguearse, puede que esta cuenta ya este registrada o no exista')
    });
}
//  funcion cerrar sesion
const logout =()=>{
  firebase.auth().signOut()
    .then(function () {
      window.location.href = 'index.html'
    }).catch(function (error) {
      console.log('hubo un error')
    });
}
// funcion para crear y editar post
const createPost = (postText, State, category, id = 0) => {
  const user = firebase.auth().currentUser
  const postInfo = {
    id: user.uid,
    name: user.displayName,
    post: postText,
    postState: State,
    postCategory: category,
    likeCount: 0,
  };
  if (!id) {
    id = firebase.database().ref().child('posts').push().key
  }
  const newPostKey = id;
  let sharePost = {};
  sharePost['/posts/' + newPostKey] = postInfo;
  // sharePost['/user-posts/' + user.uid + '/' + newPostKey] = postInfo
  return firebase.database().ref().update(sharePost).then(console.log("se guardo exitosamente"));
  //timelinePost()
}
// funcion para mostrar posts
const timelinePost = (category) => {
  postContainer.innerHTML = ''
  const user = firebase.auth().currentUser
  console.log(user)
    firebase.database().ref('posts')
    .on('child_added', (createdPost) => {
      //console.log(createdPost.val())
      if (user.uid === createdPost.val().id && category === createdPost.val().postCategory){
        createcontainerPost(createdPost)
        createcontainerPostPrivado(createdPost)
      } else if (user.uid !== createdPost.val().id && category === createdPost.val().postCategory) {
        createcontainerPost(createdPost)
      }

    }) 
}
// funcion para contar likes
// const counterLike = (likes) => {
//   let dataLike = parseInt(likes)
//   // let totalLikes = likeCount + 1  
//     firebase.database().ref('posts')
//     .on('value', function(snapshot) {
//       snapshot.forEach(function(childSnapshot) {
//         var childData = childSnapshot.val().likeCount;
//         childData = dataLike +1
//         console.log(childData)
//       })})
//   // createPost(postText, postState,id,totalLikes)
 
// }
const counterLike = (id)=>{
  var postref =firebase.database().ref('posts'+id)
    postref.child('likeCount').on('value', function(snapshot) {
      // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val()?snapshot.val():0
        // childData = dataLike +1
        // console.log(childData)
        postref.update({
          likeCount:childData + 1
        })
      // })
    })
}
// funcion para eliminar post
const deletePost = (id) => {
  const post = firebase.database().ref('posts/' + id)
  post.remove()
}
// const stateUser = ()=>{
//   let userid = firebase.auth().currentUser.uid
//   console.log(userid)
// }
