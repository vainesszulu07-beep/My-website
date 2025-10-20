window.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usersList = document.getElementById("users-list");
    
    if (users.length === 0) {
        usersList.innerHTML = "<li>No users yet.</li>";
        return;
    }

    users.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.username} (${u.phone})`;
        usersList.appendChild(li);
    });
});
