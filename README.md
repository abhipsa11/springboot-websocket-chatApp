# Spring Boot WebSocket Chat Application  
### Real-time Group Chat + Private One-to-One Chat (STOMP + SockJS)

This is a real-time chat application built using **Spring Boot WebSocket**, **STOMP messaging**, and **SockJS**.  
It supports:

✔ Real-time **group chat**  
✔ **Private chat** between two users  
✔ User join/leave notifications  
✔ Multiple browser clients  
✔ Clean UI using HTML, CSS, and JavaScript  

---

## 🚀 Features

### 🟢 Group Chat
- Broadcast messages instantly to all connected users.
- Displays join/leave notifications.
- No page refresh required.

### 🔵 Private Chat
- Secure one-to-one messaging between users.
- Uses dynamic destinations → `/queue/private.{username}`.
- Sender sees:  
  `You → receiver: message`
- Receiver sees:  
  `(Private) sender → You: message`

### 🟠 WebSocket Messaging Flow
- `/topic/public` → group chat messages  
- `/queue/private.{username}` → private messages  
- `/app/chat.sendMessage` → send group messages  
- `/app/chat.privateMessage` → send private messages  
- `/app/chat.addUser` → handle join events  

### 🧩 Frontend (Vanilla JavaScript)
- Implements WebSocket client using SockJS + STOMP.
- Handles real-time updates.
- Manages user switching, subscriptions, and UI updates.

---

## 🛠️ Tech Stack

| Layer      | Technologies |
|------------|-------------|
| Backend    | Spring Boot, WebSocket, STOMP, SockJS |
| Frontend   | HTML, CSS, JavaScript |
| Build Tool | Maven |
| Protocol   | WebSocket (STOMP over SockJS) |
| IDE        | IntelliJ IDEA |

---

## 📁 Project Structure

```text
src/main/java/com/chatApp/chat
│
├── config
│   └── WebSocketConfig.java
│
├── controller
│   └── ChatController.java
│
├── listener
│   └── WebSocketEventListener.java
│
├── model
│   ├── ChatMessage.java
│   └── MessageType.java
│
└── ChatApplication.java

src/main/resources/static
│
├── index.html
└── main.js

pom.xml
README.md
```

---

## ▶️ How to Run

### 1️⃣ Clone the repository
git clone https://github.com/<your-username>/springboot-websocket-chatApp.git
cd springboot-websocket-chatApp

### 2️⃣ Run the Spring Boot application
mvn spring-boot:run

### 3️⃣ Open the application
http://localhost:8080

### 4️⃣ Test with multiple users
1. Open two or more browser tabs
2. Join with different usernames
3. Send group and private messages


❤️ Author
Abhipsa Choudhury
Java Developer | Spring Boot | Backend Engineering
🔗 GitHub: https://github.com/abhipsa11
🔗 LinkedIn: https://linkedin.com/in/abhipsa-choudhury-3a3825212
