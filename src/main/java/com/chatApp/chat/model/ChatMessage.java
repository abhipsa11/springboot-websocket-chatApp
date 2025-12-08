package com.chatApp.chat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private MessageType type;   // CHAT, JOIN, LEAVE
    private String content;     // message body
    private String sender;      // who sent the message

    // used only for private messaging
    private String recipient;
}
