const btnLogin = document.getElementById("btn-login");
const btnSignUp = document.getElementById("btn-signup");
const btnLogout = document.getElementById("btn-logout");
const btnGoogle = document.getElementById("btn-google");
const btnFacebook = document.getElementById("btn-facebook");
let database = firebase.database()
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
    } else {
      console.log('no esta logueado')
    }
  });
  timelinePost()
};

window.timelinePost = () => {
  let containerpub = ''
  const postContainer = document.getElementById("post-container")
  firebase.database().ref('posts')
    .on('child_added', (createdPost) => {

      containerpub = `
     <div id="${createdPost.key}">
    <div class="input-field">
    <p><i class="material-icons prefix">account_circle</i>
    ${createdPost.val().name}</p>
  </div>
  <div class="post-user">
  <p>${createdPost.val().post}</p>
    <div class="post-options">
      <div>${createdPost.val().likeCount}</div>
      <i class="material-icons prefix button-link" data-id="${createdPost.key}" 
      data-value="${createdPost.val().post}" 
      data-poststate="${createdPost.val().postState}" 
      data-link="${createdPost.val().likeCount}">thumb_up</i>
   
     
      <button class="delete-post" data-id="${createdPost.key}">Eliminar</button>
      <a class="edit-button modal-trigger" data-id="${createdPost.key}" data-value="${createdPost.val().post}" href="#modaledit">Editar</a>
    </div>
  </div>
  </div>
    `
      postContainer.innerHTML = containerpub + postContainer.innerHTML
      const postDelete = document.getElementsByClassName("delete-post")
      for (elem of postDelete) {
        if (elem) {
          elem.addEventListener('click', event => {
            deletePost(event.target.dataset.id)
            window.location.reload(true)
          })
        }
      }
      const postEdit = document.getElementsByClassName("edit-button")
      for (elem of postEdit) {
        if (elem) {
          elem.addEventListener('click', event => {
            const idEditButton = document.getElementById("save-post")
            const areaText = document.getElementById("edit-text")
            areaText.innerHTML = event.target.dataset.value
            idEditButton.setAttribute("data-id", event.target.dataset.id)
            idEditButton.setAttribute("data-value", event.target.dataset.value)

          })
        }
      }

      const postLike = document.getElementsByClassName("button-link")
      for (elem of postLike) {
        if (elem) {
          elem.addEventListener('click', event => {
            console.log(event)
            let linkcount = parseInt(event.target.dataset.link)

            console.log(linkcount)
            let totalink = linkcount + 1
            let poststate = (event.target.dataset.poststate) ? event.target.dataset.poststate : 1

            createPost(
              event.target.dataset.value,
              poststate,
              event.target.dataset.id,
              totalink
            )
            window.location.reload(true)
          })
        }
      }
    })
}
// guardando en base de datos
let addUserDataB = (id, name, email, photo) => {
  let addedUser = database.ref("/users/" + id).set({
    uid: id,
    username: name,
    email: email,
    profileimage: photo
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

// agregar evento de signup
btnSignUp.addEventListener('click', e => {
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
})

window.emailVerification= () =>{
  const user = firebase.auth().currentUser
    user.sendEmailVerification()
      .then(result=>{
        ShowMsgVerification()
      }
      )
      .catch(error => {
        console.log('hay un error')    
  })
}

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

btnFacebook.addEventListener('click', e => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      window.location.href = 'main.html'
    }).catch(error => {
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
const createPost = (postText, State, id = 0, likeCount = 0) => {
  const user = firebase.auth().currentUser
  const postInfo = {
    id: user.uid,
    name: user.displayName,
    post: postText,
    postState: State,
    likeCount: likeCount,
  };
  if (!id) {
    id = firebase.database().ref().child('posts').push().key
  }
  const newPostKey = id;
  let sharePost = {};
  sharePost['/posts/' + newPostKey] = postInfo;
  return firebase.database().ref().update(sharePost).then(console.log("se guardo exitosamente"));
}
const btnPublish = document.getElementById("btn-publish")
const postArea = document.getElementById("post-action")
const selectState = document.getElementById("select-state")
btnPublish.addEventListener('click', event => {
  console.log(postArea.value)
  if (postArea.value !== '') {
    createPost(postArea.value, selectState.value)
    window.location.reload = 'main.html'
    postArea.value = ''
  } else {
    alert('escribe algo')
  }
})
// eliminar post
const deletePost = (id) => {
  confirm('esta seguro que desea ')
  console.log(id)
  const post = firebase.database().ref('posts/' + id)
  post.remove()
}
// editar post
const saveButton = document.getElementById("save-post")
saveButton.addEventListener('click', event => {
  const editInput = document.getElementById("edit-text")
  const editSelect = document.getElementById("edit-state")
  createPost(editInput.value, editSelect.value, event.target.dataset.id)
  window.location.reload(true);
})

const countLike = (postId) => {
  var starCountRef = firebase.database().ref('posts/' + postId + '/starCount')

  createPost(postText, State, id = 0, likeCount = 0)

}

// link
