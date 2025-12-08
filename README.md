Spring Boot WebSocket Chat Application
Real-time Group Chat + Private One-to-One Chat (STOMP + SockJS)

This is a real-time chat application built using Spring Boot WebSocket, STOMP messaging, and SockJS.
It supports:

✔ Real-time group chat
✔ Private chat between two users
✔ User join/leave notifications
✔ Multiple browser clients
✔ Clean UI using HTML, CSS, and JavaScript

🚀 Features
🟢 Group Chat

Broadcasts messages to all connected users.

Shows join/leave notifications.

Updates instantly without refreshing the page.

🔵 Private Chat

One-to-one messaging between users.

Uses dynamic private channels (/queue/private.{username}).

Sender sees:
You → receiver: message

Receiver sees:
(Private) sender → You: message

🟠 WebSocket Messaging Flow

/topic/public → group chat messages

/queue/private.{username} → private messages

/app/chat.sendMessage → send group messages

/app/chat.privateMessage → send private messages

/app/chat.addUser → handle user join events

🧩 Frontend (Vanilla JS)

Connects to WebSocket via SockJS + STOMP.

Dynamically updates chat UI.

Handles subscriptions and message parsing.

🛠️ Tech Stack
Layer	Technologies
Backend	Spring Boot 3+, WebSocket, STOMP, SockJS
Frontend	HTML, CSS, JavaScript
Build Tool	Maven
Protocol	WebSocket (STOMP over SockJS)
IDE	IntelliJ IDEA
📁 Project Structure
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


▶️ How to Run the Project
1. Clone the repository
git clone https://github.com/<your-username>/springboot-websocket-chatApp.git
cd springboot-websocket-chatApp

2. Start the Spring Boot application
mvn spring-boot:run

3. Open in browser
http://localhost:8080

4. Test real-time chat

Open multiple tabs

Join with different usernames

Try group and private messages

❤️ Author

Abhipsa Choudhury
Java Developer | Spring Boot | Backend Engineering
LinkedIn: https://linkedin.com/in/abhipsa-choudhury-3a3825212
