import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../../domain/entities/Message';
import { ChatService } from '../../application/services/ChatService';
import LiveMatch from './LiveMatch';
import {
  ChatContainer,
  Header,
  Logo,
  Title,
  LiveIndicator,
  MessagesContainer,
  MessageBubble,
  InputContainer,
  Input,
  Button,
} from '../styles/components/Chat.styles';
import furiaLogo from '../../assets/furia-logo.png';

const Chat = () => {
  const [messages, setMessages] = useState([
    Message.create('Olá! Eu sou o bot da FURIA.\nComo posso te ajudar?', 'bot'),
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLiveMatch, setShowLiveMatch] = useState(false);
  const chatService = useRef(new ChatService());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = Message.create(input, 'user');
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatService.current.processMessage(userMessage);
      setMessages(prev => [...prev, botResponse]);

      if (botResponse.isLive) {
        setShowLiveMatch(true);
      }
    } catch (error) {
      console.log(error)
      const errorMessage = Message.create(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        'bot'
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={furiaLogo} alt="FURIA Logo" />
          <Title>FURIA CS Chat</Title>
        </div>
        <LiveIndicator>
          <span className="dot"></span>
          LIVE
        </LiveIndicator>
      </Header>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            type={message.sender === 'bot' ? 'bot' : 'user'}
          >
            {message.content}
          </MessageBubble>
        ))}
        {isLoading && (
          <MessageBubble type="bot">
            Processando sua mensagem...
          </MessageBubble>
        )}
        {showLiveMatch && <LiveMatch />}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat; 