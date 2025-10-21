// Get username from localStorage or default
let user = JSON.parse(localStorage.getItem('chatUser') || '{}');
if (!user.name) user = { name: "Guest" };

// Initialize Ably Realtime with your key
const ably = new Ably.Realtime('0EWn-w.VljMsA:ug9QItIMybaBhtUFOulr7rstilnqKUSjc9lhQd0YxNw');
const channel = ably.channels.get('chat');

// DOM elements
const chatArea = document.getElementById('chatArea');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// Send message
function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;
  channel.publish('message', { name: user.name, text });
  msgInput.value = '';
}

// Send on button click or Enter key
sendBtn.addEventListener('click', sendMsg);
msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });

// Receive messages in real-time
channel.subscribe('message', msg => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<strong>${msg.data.name}</strong>: ${msg.data.text}`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
});
