import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getDatabase, ref, get, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZMRyjNGLhbYSA47_OaTiLyZaPOCKZur4",
  authDomain: "live-chat-a5839.firebaseapp.com",
  databaseURL: "https://live-chat-a5839-default-rtdb.firebaseio.com",
  projectId: "live-chat-a5839",
  storageBucket: "live-chat-a5839.appspot.com",
  messagingSenderId: "1053299545235",
  appId: "1:1053299545235:web:b83174bff1bd498d9be966"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const usersListDiv = document.getElementById("users-list");
const currentUserPhone = localStorage.getItem("currentUserPhone");

if (!currentUserPhone) {
  alert("Please login first!");
  window.location.href = "index.html";
}

// Display users
const usersRef = ref(db, "users");
onValue(usersRef, (snapshot) => {
  const users = snapshot.val();
  if (!users) return;
  usersListDiv.innerHTML = "Users: " + Object.values(users).map(u => u.name).join(", ");
  renderMessages(users);
});

// Render messages
function renderMessages(users) {
  chatBox.innerHTML = "";
  Object.values(users).forEach(u => {
    if (!u.messages) return;
    u.messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.textContent = `${msg.sender}: ${msg.text}`;
      chatBox.appendChild(msgDiv);
    });
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value.trim();
  if (!message) return;

  const messagesRef = ref(db, `users/${currentUserPhone}/messages`);
  await push(messagesRef, { sender: currentUserPhone, text: message });
  document.getElementById("message").value = "";
});
