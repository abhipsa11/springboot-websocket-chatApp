console.log("✅ main.js loaded");

let stompClient = null;
let username = null;

const usernamePage = document.querySelector('#username-page');
const chatPage = document.querySelector('#chat-page');

const usernameForm = document.querySelector('#usernameForm');
const messageForm = document.querySelector('#messageForm');
const privateMessageForm = document.querySelector('#privateMessageForm');

const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const privateMessageInput = document.querySelector('#privateMessage');
const recipientInput = document.querySelector('#recipient');

const messageArea = document.querySelector('#messageArea');
const privateMessageArea = document.querySelector('#privateMessageArea');

usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
privateMessageForm.addEventListener('submit', sendPrivateMessage, true);

// ========== CONNECT ==========
function connect(event) {
    event.preventDefault();
    console.log("➡️ connect() called");

    username = nameInput.value.trim();
    console.log("username =", username);

    if (!username) {
        alert("Please enter username");
        return;
    }

    // safety check
    if (typeof SockJS === "undefined" || typeof Stomp === "undefined") {
        console.error("❌ SockJS or Stomp not loaded");
        alert("SockJS / STOMP library not loaded. Check your internet or script tags.");
        return;
    }

    const socket = new SockJS('/ws'); // must match your backend endpoint
    stompClient = Stomp.over(socket);

    console.log("Connecting to WebSocket…");
    stompClient.connect({}, onConnected, onError);
}

function onConnected() {
    console.log("✅ Connected as", username);

    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.subscribe('/queue/private.' + username, onPrivateMessageReceived);

    stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    usernamePage.style.display = 'none';
    chatPage.style.display = 'block';
    console.log("✅ Switched to chat page");
}

function onError(error) {
    console.error("❌ WebSocket Error:", error);
    alert("Cannot connect to WebSocket. Check server & endpoint.");
}

// ========== SEND GROUP MESSAGE ==========
function sendMessage(event) {
    event.preventDefault();

    const content = messageInput.value.trim();
    if (!content || !stompClient) return;

    const chatMessage = {
        sender: username,
        content: content,
        type: 'CHAT'
    };

    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    messageInput.value = "";
}

// ========== SEND PRIVATE MESSAGE ==========
function sendPrivateMessage(event) {
    event.preventDefault();

    const recipient = recipientInput.value.trim();
    const content = privateMessageInput.value.trim();
    if (!recipient || !content || !stompClient) return;

    const chatMessage = {
        sender: username,
        recipient: recipient,
        content: content,
        type: 'CHAT'
    };

    stompClient.send("/app/chat.privateMessage", {}, JSON.stringify(chatMessage));

    const li = document.createElement('li');
    li.textContent = `You → ${recipient}: ${content}`;
    privateMessageArea.appendChild(li);
    privateMessageInput.value = "";
}

// ========== RECEIVE GROUP MESSAGE ==========
function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    const li = document.createElement('li');

    if (message.type === 'JOIN') {
        li.textContent = `${message.sender} joined the chat`;
    } else if (message.type === 'LEAVE') {
        li.textContent = `${message.sender} left the chat`;
    } else {
        li.textContent = `${message.sender}: ${message.content}`;
    }

    messageArea.appendChild(li);
}

// ========== RECEIVE PRIVATE MESSAGE ==========
function onPrivateMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    const li = document.createElement('li');

    li.textContent = `(Private) ${message.sender} → You: ${message.content}`;
    privateMessageArea.appendChild(li);
}
