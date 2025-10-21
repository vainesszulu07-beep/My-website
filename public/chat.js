// ==========================
// Get user info from localStorage
// ==========================
let user = JSON.parse(localStorage.getItem('chatUser') || '{}');
if (!user.name) {
  alert("Please enter your name first!");
  window.location.href = 'index.html';
}

// ==========================
// Initialize Firebase (compat CDN version)
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyDjnNg5ZwgYhXmdcmXbIrPQ6dZR4g6qwHY",
  authDomain: "live-chat-6b081.firebaseapp.com",
  databaseURL: "https://live-chat-6b081-default-rtdb.firebaseio.com",
  projectId: "live-chat-6b081",
  storageBucket: "live-chat-6b081.appspot.com",
  messagingSenderId: "909951780715",
  appId: "1:909951780715:web:c4cbfe67b6a43e5d33ae2e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const chatRef = db.ref('messages');
const usersRef = db.ref('onlineUsers');

// ==========================
// Set user as online
// ==========================
const userRef = usersRef.push({ name: user.name });
userRef.onDisconnect().remove();

// ==========================
// Display online users
// ==========================
const usersUl = document.getElementById('usersUl');
usersRef.on('value', snapshot => {
  const users = snapshot.val() || {};
  usersUl.innerHTML = '';
  Object.values(users).forEach(u => {
    const li = document.createElement('li');
    li.innerText = u.name;
    usersUl.appendChild(li);
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
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

  chatRef.push({
    name: user.name,
    text: text,
    timestamp: Date.now(),
    time: time
  }).then(() => msgInput.value = '')
    .catch(err => {
      console.error('Message send failed:', err);
      alert('Could not send message. Check console.');
    });
}

// ==========================
// Display messages in real-time
// ==========================
chatRef.on('value', snapshot => {
  const messages = snapshot.val() || {};
  chatArea.innerHTML = '';
  Object.values(messages).forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(msg.name === user.name ? 'own' : 'other');
    div.innerHTML = `<strong>${msg.name}</strong>: ${msg.text} <span class="time">${msg.time}</span>`;
    chatArea.appendChild(div);
  });
  chatArea.scrollTop = chatArea.scrollHeight;
});
