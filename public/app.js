import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";

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

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!name || !phone) return;

  const userRef = ref(db, `users/${phone}`);
  const snapshot = await get(userRef);

  if (!snapshot.exists()) {
    await set(userRef, { name, messages: [] });
  }

  localStorage.setItem("currentUserPhone", phone);
  window.location.href = "chat.html";
});
