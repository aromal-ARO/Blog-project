import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaTimes, FaPaperPlane, FaImage, FaFileUpload } from 'react-icons/fa';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const BotIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #4285f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #3367d6;
  }

  svg {
    color: white;
    font-size: 30px;
  }
`;

const ChatWindow = styled.div`
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0)')};
  transform-origin: bottom right;
  transition: transform 0.3s ease;
  position: absolute;
  bottom: 70px;
  right: 0;
`;

const ChatHeader = styled.div`
  background-color: #4285f4;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  svg {
    cursor: pointer;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const MessageContent = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${({ isUser }) => (isUser ? '#4285f4' : '#e0e0e0')};
  color: ${({ isUser }) => (isUser ? 'white' : 'black')};
  word-wrap: break-word;
`;

const ImageMessage = styled.div`
  max-width: 80%;
  margin-top: 5px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  display: block;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #777;
  margin-top: 5px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: white;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #4285f4;
  }
`;

const SendButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const UploadButton = styled.label`
  background-color: #34a853;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d8e47;
  }

  input {
    display: none;
  }
`;

const LoadingIndicator = styled.div`
  padding: 10px;
  text-align: center;
  color: #777;
  font-style: italic;
`;

const Chatbot = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(apiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
  };

  const generateBlogFromImage = async () => {
    if (!image) return;

    setIsLoading(true);
    
    // Create a message showing the uploaded image
    const imageMessage = {
      image: image,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, imageMessage]);
    setImage(null);

    try {
      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Convert base64 image to GoogleGenerativeAI.Part object
      const imageParts = [
        {
          inlineData: {
            data: image.split(',')[1],
            mimeType: 'image/jpeg',
          },
        },
      ];

      // Prompt for blog generation
      const prompt = "Generate a detailed blog post based on this image. Include a creative title, introduction, main content with several paragraphs, and a conclusion. Make it engaging and informative.";

      // Send the prompt with the image
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      const botMessage = {
        text: text,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        text: 'Sorry, I encountered an error while generating the blog. Please try again later.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !image) || isLoading) return;

    if (image) {
      await generateBlogFromImage();
      return;
    }

    const userMessage = {
      text: input,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Send the prompt
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const botMessage = {
        text: text,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <BotIcon onClick={toggleChat}>
        <FaRobot />
      </BotIcon>

      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <span>BlogPulse Assistant</span>
          <FaTimes onClick={toggleChat} />
        </ChatHeader>

        <ChatMessages>
          {messages.length === 0 ? (
            <Message>
              <MessageContent isUser={false}>
                Hello! I'm your BlogPulse assistant. You can upload an image and I'll generate a blog post for you, or just ask me anything!
              </MessageContent>
            </Message>
          ) : (
            messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.image ? (
                  <>
                    <ImageMessage>
                      <UploadedImage src={message.image} alt="Uploaded content" />
                    </ImageMessage>
                    <MessageTime>{message.time}</MessageTime>
                  </>
                ) : (
                  <>
                    <MessageContent isUser={message.isUser}>
                      {message.text}
                    </MessageContent>
                    <MessageTime>{message.time}</MessageTime>
                  </>
                )}
              </Message>
            ))
          )}
          {isLoading && (
            <Message>
              <MessageContent isUser={false}>
                <LoadingIndicator>Generating your blog post...</LoadingIndicator>
              </MessageContent>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInputContainer>
          {image ? (
            <>
              <UploadButton onClick={clearImage} style={{ backgroundColor: '#ea4335' }}>
                <FaTimes />
              </UploadButton>
              <span style={{ fontSize: '0.8rem', marginRight: '10px' }}>Image ready</span>
            </>
          ) : (
            <UploadButton>
              <FaImage />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </UploadButton>
          )}
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={image ? "Add optional text..." : "Type your message..."}
            disabled={isLoading}
          />
          <SendButton 
            onClick={handleSendMessage} 
            disabled={isLoading || (!input.trim() && !image)}
          >
            <FaPaperPlane />
          </SendButton>
        </ChatInputContainer>
      </ChatWindow>
    </ChatbotContainer>
  );
};

export default Chatbot;