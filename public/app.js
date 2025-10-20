// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZMRyjNGLhbYSA47_OaTiLyZaPOCKZur4",
  authDomain: "live-chat-a5839.firebaseapp.com",
  databaseURL: "https://live-chat-a5839-default-rtdb.firebaseio.com",
  projectId: "live-chat-a5839",
  storageBucket: "live-chat-a5839.appspot.com",
  messagingSenderId: "1053299545235",
  appId: "1:1053299545235:web:b83174bff1bd498d9be966"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Grab form elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const username = usernameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!username || !phone) {
    alert("Please enter both name and phone number.");
    return;
  }

  try {
    // Save user info to Firebase under a unique key
    const userRef = db.ref("users").push();
    await userRef.set({
      name: username,
      phone: phone
    });

    // Redirect to chat page after successful save
    window.location.href = "chat.html";

  } catch (error) {
    console.error("Error saving user:", error);
    alert("Failed to save your info. Try again.");
  }
});
