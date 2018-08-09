const btnLogout = document.getElementById("btn-logout");
const btnFacebook = document.getElementById("btn-facebook");
let database = firebase.database();
let auth = firebase.auth();
let userConect = null;
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    let name = document.getElementById("user-name");
    let email = document.getElementById("user-email");
    let picProfile = document.getElementById("user-pic");
    if (user) {
      let userName = user.displayName;
      let userEmail = user.email;
      let userPic = user.photoURL;
      name.innerHTML = userName;
      email.innerHTML = userEmail;
      if (userPic) {
        picProfile.style.backgroundImage = "url(" + userPic + ")";
      } else {
        picProfile.style.backgroundImage = "url(https://image.ibb.co/h7ehKT/baseline_account_circle_black_48dp.png)";
      }
      addUserDataB(user.uid, user.displayName, user.email, user.photoURL);
      timelinePost();
    } else {
      console.log('no esta logueado');
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
  return addedUser;
}
// funcion de registro
const registro = (name, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(firebaseUser => {
      const user = firebase.auth().currentUser;
      if (user) {
        user.updateProfile({
          displayName: name,
        })
        emailVerification();
      }
    })
}
// funcion para enviar email de verificacion
window.emailVerification = () => {
  const user = firebase.auth().currentUser
  user.sendEmailVerification()
    .then(result => {
      ShowMsgVerification();
    })
}
// funcion de logueo
const Login = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => window.location.href = 'main.html')
}
// funcion para logueo con google
const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html';
    }).catch(error => {
      alert('Hubo un error al Conectar');
    });
}
//  funcion de logueo facebook
const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html';
    }).catch(error => {
      alert('Hubo un error al loguearse, puede que esta cuenta ya este registrada o no exista');
    });
}
//  funcion cerrar sesion
const logout = () => {
  firebase.auth().signOut()
    .then(function () {
      window.location.href = 'index.html';
    })
}
// funcion para crear y editar post
const createPost = (postText, State, category = 0, id = 0) => {
  const user = firebase.auth().currentUser;
  const postInfo = {
    id: user.uid,
    name: user.displayName,
    post: postText,
    postState: State,
    postCategory: category,
    likeCount: 0,
  };
  newPostKey = database.ref().child('posts').push().key
  let sharePost = {};
  sharePost['/posts/' + newPostKey] = postInfo;
  return database.ref().update(sharePost);

}
// funcion para mostrar posts
const timelinePost = (category) => {
  postContainer.innerHTML = '';
  const user = firebase.auth().currentUser
  // console.log(user)
  firebase.database().ref('posts')
    .on('child_added', (createdPost) => {
      if (user.uid === createdPost.val().id && category === createdPost.val().postCategory) {
        createcontainerPost(createdPost);
        createcontainerPostPrivado(createdPost);
      } else if (user.uid !== createdPost.val().id && category === createdPost.val().postCategory) {
        createcontainerPost(createdPost);
      }
    })
}
const counterLike = (postId) => {
  let postref = firebase.database().ref('posts/' + postId);
  postref.transaction(function (post) {
    if (post) {
      post.likeCount++;
    }
    return post;
  });
}
// funcion para eliminar post
const deletePost = (id) => {
  const post = firebase.database().ref('posts/' + id);
  post.remove()
}
const updatePost = (postId, post, postState) => {
  let postref = firebase.database().ref('posts/' + postId);
  postref.transaction(function (objectPost) {
    if (objectPost) {
      objectPost.post = post;
      objectPost.postState = postState;
    }
    return objectPost;
  });
}
