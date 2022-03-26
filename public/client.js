const socket = io();
let Username;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

while (!Username) {
  Username = prompt("Please enter your Username");
}

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: Username,
    message: message.trim(),
  };

  appendMessage(msg, "outgoing");

  textarea.value = "";
  scrollToBottom();
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// we receive messages
// 'message' -> event's name
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
