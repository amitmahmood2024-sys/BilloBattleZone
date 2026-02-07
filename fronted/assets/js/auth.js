function login() {
  const email = email.value;
  const password = password.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location = "dashboard.html";
    })
    .catch(err => {
      authMsg.innerText = err.message;
    });
}

function register() {
  const email = email.value;
  const password = password.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location = "dashboard.html";
    })
    .catch(err => {
      authMsg.innerText = err.message;
    });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      window.location = "dashboard.html";
    })
    .catch(err => {
      authMsg.innerText = err.message;
    });
}
