// 🔥 Firebase config (PASTE YOUR REAL CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyATQiZKadnZ5-sdZun4HMf6PQv9cPGp64k",
  authDomain: "billobattlehub.firebaseapp.com",
  projectId: "billobattlehub",
  appId: "1:1077370113383:web:ea7adbd8175f3cc13eb3c2"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// FCM placeholder (future)
let messaging;
if (firebase.messaging) {
  messaging = firebase.messaging();
}


  