const signUpForm = document.getElementById("go-signup");
const btnLogin = document.getElementById("btn-login");
const btnGoogle = document.getElementById("btn-google");
const btnSignUp = document.getElementById("btn-signup");
// agregar evento a boton de registro
btnSignUp.addEventListener('click', e => {
	const name = document.getElementById("id-name").value;
	const email = document.getElementById("email-sign").value;
	const pass = document.getElementById("password-sign").value;
	if (validatesignForm(name, email, pass) === true) {
		registro(name, email, pass);
	}
})
// agregar evento para redireccionar a form de registro
signUpForm.addEventListener('click', e => window.location.href = 'signup.html')
// mensaje que se envio email de verififcacion
const ShowMsgVerification = () => {
	const divForm = document.getElementById("signup-form");
	divForm.innerHTML = '<span>Se te envio un mensaje de verificacion, revisa tu bandeja de entrada.Si se verifico tu correo correctamente </span>';
	msgVerification = document.createElement('p');
	msgVerification.innerHTML = 'Inicia Sesion';
	divForm.appendChild(msgVerification);
	msgVerification.addEventListener('click', action => window.location.href = 'index.html');
}
// agregar evento de login
btnLogin.addEventListener('click', e => {
	const email = document.getElementById("email-log").value;
	const pass = document.getElementById("password-log").value;
	if (validateloginForm(email, pass) === true) {
		Login(email, pass);
	};
});
// agregando evento boton google
btnGoogle.addEventListener('click', e => {
	googleLogin();
})
//  agregando evento de registro con facebook
btnFacebook.addEventListener('click', e => {
	loginFacebook();
})
// agrgar evento a boton cerrr sesion
btnLogout.addEventListener('click', e => {
	logout();
})
const postContainer = document.getElementById("post-container");
// funcion para crear contenedores del post
const createcontainerPost = (newPost) => {
	// console.log(newPost.toJSON()	)
	let idUser = firebase.auth().currentUser.uid;
	let containerpub = '';
	let htmlDelete = '';
	let htmlEditar = '';
	if (newPost.val().id == idUser) {
		htmlDelete = `<a class="modal-delete modal-trigger" data-id="${newPost.key}" href="#modaldelete">Eliminar</a>  `;
		htmlEditar = `<a class="edit-button modal-trigger" data-id="${newPost.key}" data-value="${newPost.val().post}" href="#modaledit">Editar</a>`;
	}
	if (newPost.val().postState === 'Publico') {
		containerpub = `
    <div id="${newPost.key}">
      <div class="user-name-post">
       <i class="material-icons prefix">account_circle</i> <a>${newPost.val().name}</a>
      </div>
			<div class=" rom post-user">
			<div class="input-field ">
				<textarea readonly class="materialize-textarea posted-text">${newPost.val().post}</textarea>
				</div>
				<div class="post-options right ">
          <a>${newPost.val().likeCount}</a>
          <i class="material-icons prefix button-link" data-id="${newPost.key}" data-value="${newPost.val().post}" 
          data-poststate="${newPost.val().postState}" data-link="${newPost.val().likeCount}">thumb_up</i>
					${htmlDelete}
					${htmlEditar}
        </div>
      </div>
    </div>
   `
		postContainer.innerHTML = containerpub + postContainer.innerHTML
		const postDelete = document.getElementsByClassName("modal-delete");
		for (elem of postDelete) {
			if (elem) {
				elem.addEventListener('click', event => {
					const idDeleteButton = document.getElementById("btn-delete-post");
					idDeleteButton.setAttribute("data-id", event.target.dataset.id);
				})
			}
		}
		const postEdit = document.getElementsByClassName("edit-button");
		for (elem of postEdit) {
			if (elem) {
				elem.addEventListener('click', event => {
					const idEditButton = document.getElementById("save-post");
					const areaText = document.getElementById("edit-text");
					areaText.innerHTML = event.target.dataset.value;
					idEditButton.setAttribute("data-id", event.target.dataset.id);
					idEditButton.setAttribute("data-value", event.target.dataset.value);
				})
			}
		}
		const postLike = document.getElementsByClassName("button-link");
		for (elem of postLike) {
			if (elem) {
				elem.addEventListener('click', event => {
					counterLike(event.target.dataset.id);
					window.location.reload(true);
				})
			}
		}
	}
}
const createcontainerPostPrivado = (newPost) => {
	let containerpub2 = '';
	if (newPost.val().postState === 'Privado') {
		containerpub2 = `
    <div id="${newPost.key}">
      <div class="user-name-post">
       <i class="material-icons prefix">account_circle</i> <a>${newPost.val().name}</a>
      </div>
      <div class="post-user">
        <textarea readonly class="posted-text">${newPost.val().post}</textarea>
        <div class="post-options right ">
          <a>${newPost.val().likeCount}</a>
          <i class="material-icons prefix button-link" data-id="${newPost.key}" data-value="${newPost.val().post}" 
          data-poststate="${newPost.val().postState}" data-link="${newPost.val().likeCount}">thumb_up</i>
          <a class="modal-delete modal-trigger" data-id="${newPost.key}" href="#modaldelete">Eliminar</a>
          <a class="edit-button modal-trigger" data-id="${newPost.key}" data-value="${newPost.val().post}" href="#modaledit">Editar</a>
        </div>
      </div>
    </div>
   `;
		postContainer.innerHTML = containerpub2 + postContainer.innerHTML
		const postDelete2 = document.getElementsByClassName("modal-delete");
		for (elem of postDelete2) {
			if (elem) {
				elem.addEventListener('click', event => {
					const idDeleteButton2 = document.getElementById("btn-delete-post");
					idDeleteButton2.setAttribute("data-id", event.target.dataset.id);
				})
			}
		}
		const postEdit2 = document.getElementsByClassName("edit-button");
		for (elem of postEdit2) {
			if (elem) {
				elem.addEventListener('click', event => {
					const idEditButton2 = document.getElementById("save-post");
					const areaText2 = document.getElementById("edit-text");
					areaText2.innerHTML = event.target.dataset.value;
					idEditButton2.setAttribute("data-id", event.target.dataset.id);
					idEditButton2.setAttribute("data-value", event.target.dataset.value);
				})
			}
		}
		const postLike2 = document.getElementsByClassName("button-link");
		for (elem of postLike2) {
			if (elem) {
				elem.addEventListener('click', event => {
					counterLike(event.target.dataset.id);
					window.location.reload(true);
				})
			}
		}
	}
}
const btnPublish = document.getElementById("btn-publish");
const postArea = document.getElementById("post-action");
const selectState = document.getElementById("select-state");
const selectCategory = document.getElementById("select-category");
// agregar evento a publicar post
btnPublish.addEventListener('click', event => {
	if (postArea.value !== '') {
		createPost(postArea.value, selectState.value, selectCategory.value);
		window.location.reload = 'main.html';
		postArea.value = '';
	} else {
		alert('Esta publicación no tiene contenido');
	}
})
// agregar evento a boton guardar despues de editar post
const saveButton = document.getElementById("save-post");
saveButton.addEventListener('click', event => {
	const editInput = document.getElementById("edit-text");
	let editSelect = document.getElementById("edit-state");
	updatePost(event.target.dataset.id, editInput.value, editSelect.value);
	window.location.reload(true);
})
// agregar evento a eliminar post
const deletePostButton = document.getElementById("btn-delete-post");
deletePostButton.addEventListener('click', e => {
	deletePost(event.target.dataset.id);
	window.location.reload(true);
})

