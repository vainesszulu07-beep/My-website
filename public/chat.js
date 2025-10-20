// ==========================
// Get user info
// ==========================
let user = JSON.parse(localStorage.getItem('chatUser') || '{}');
if (!user.name) {
  alert("Please enter your name first!");
  window.location.href = 'index.html';
}
document.getElementById('header').innerText = `Welcome, ${user.name}`;

// ==========================
// Firebase setup
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyAZMRyjNGLhbYSA47_OaTiLyZaPOCKZur4",
  authDomain: "live-chat-a5839.firebaseapp.com",
  databaseURL: "https://live-chat-a5839-default-rtdb.firebaseio.com",
  projectId: "live-chat-a5839",
  storageBucket: "live-chat-a5839.appspot.com",
  messagingSenderId: "1053299545235",
  appId: "1:1053299545235:web:b83174bff1bd498d9be966"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const chatRef = db.ref('messages');
const usersRef = db.ref('onlineUsers');

// ==========================
// User online
// ==========================
const userRef = usersRef.push({ name: user.name });
userRef.onDisconnect().remove();

// ==========================
// Display online users
// ==========================
usersRef.on('value', snapshot => {
  const users = snapshot.val() || {};
  const ul = document.getElementById('usersUl');
  ul.innerHTML = '';
  Object.values(users).forEach(u => {
    const li = document.createElement('li');
    li.innerText = u.name;
    ul.appendChild(li);
  });
});

// ==========================
// Send messages
// ==========================
const chatArea = document.getElementById('chatArea');
const msgInput = document.getElementById('msgInput');
document.getElementById('sendBtn').addEventListener('click', sendMsg);
msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });

function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;

  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  chatRef.push({
    name: user.name,
    text: text,
    timestamp: Date.now(),
    time: time
  }).then(() => msgInput.value = '')
    .catch(err => {
      console.error('Send failed:', err);
      alert('Message failed. Check console.');
    });
}

// ==========================
// Display messages
// ==========================
chatRef.on('child_added', snapshot => {
  const msg = snapshot.val();
  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add(msg.name === user.name ? 'own' : 'other');
  div.innerHTML = `<strong>${msg.name}</strong>: ${msg.text} <span class="time">${msg.time}</span>`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
});
