// ==========================
// Get user info from localStorage
// ==========================
let user = JSON.parse(localStorage.getItem('chatUser') || '{}');
if (!user.name) user = { name: "Guest" };

// ==========================
// Initialize Firebase (compat CDN)
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

// ==========================
// Elements
// ==========================
const chatArea = document.getElementById('chatArea');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// ==========================
// Send message
// ==========================
sendBtn.addEventListener('click', sendMsg);
msgInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMsg(); });

function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;

  const now = new Date();
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

  chatRef.push({
    name: user.name,
    text: text,
    time: time
  }).then(() => msgInput.value = '')
    .catch(err => console.error("Message failed:", err));
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
    div.innerHTML = `<strong>${msg.name}</strong>: ${msg.text} <span class="time">${msg.time}</span>`;
    chatArea.appendChild(div);
  });
  chatArea.scrollTop = chatArea.scrollHeight;
});
