body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.chat-container {
  width: 90%;
  max-width: 600px;
}

.chat-box {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: hidden;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  margin-bottom: 10px;
}

.message.own {
  text-align: right;
  color: #007bff;
}

.message.other {
  text-align: left;
  color: #28a745;
}

.input-container {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #fff;
}

.input-container input {
  flex: 1;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
}

.input-container input:focus {
  border-color: #007bff;
}

.input-container button {
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.input-container button:hover {
  background: #0056b3;
}
