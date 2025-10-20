document.getElementById("login-btn").addEventListener("click", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();
    
    if (!username || !phone) {
        alert("Please enter both username and phone number");
        return;
    }

    // Store user info in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if user already exists
    const exists = users.some(u => u.phone === phone);
    if (!exists) {
        users.push({ username, phone });
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Redirect to chat page
    window.location.href = "chat.html";
});
