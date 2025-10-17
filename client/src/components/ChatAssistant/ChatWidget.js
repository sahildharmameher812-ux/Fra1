import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
  Tooltip,
  Zoom,
  Slide
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Minimize as MinimizeIcon
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickQuestions, setQuickQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(`session-${Date.now()}`);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load quick questions and topics
  useEffect(() => {
    if (isOpen && quickQuestions.length === 0) {
      loadQuickQuestions();
      loadTopics();
    }
  }, [isOpen]);

  const loadQuickQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE}/chat/quick-questions`);
      if (response.data.success) {
        setQuickQuestions(response.data.questions.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load quick questions:', error);
    }
  };

  const loadTopics = async () => {
    try {
      const response = await axios.get(`${API_BASE}/chat/topics`);
      if (response.data.success) {
        setTopics(response.data.topics);
      }
    } catch (error) {
      console.error('Failed to load topics:', error);
    }
  };

  const sendMessage = async (messageText) => {
    const message = messageText || inputMessage.trim();
    if (!message) return;

    // Add user message
    const userMessage = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowWelcome(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/chat`, {
        message,
        sessionId: sessionId.current
      });

      if (response.data.success) {
        const botMessage = {
          text: response.data.response,
          isUser: false,
          timestamp: new Date(),
          confidence: response.data.confidence,
          category: response.data.category
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleTopicClick = (topicName) => {
    sendMessage(`Tell me about ${topicName}`);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Zoom in={!isOpen}>
          <Tooltip title="Chat Assistant" placement="left">
            <Fab
              color="primary"
              aria-label="chat"
              onClick={toggleChat}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease',
                zIndex: 1000
              }}
            >
              <ChatIcon />
            </Fab>
          </Tooltip>
        </Zoom>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Slide direction="up" in={isOpen}>
          <Paper
            elevation={8}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: { xs: '90vw', sm: 400 },
              height: isMinimized ? 'auto' : { xs: '80vh', sm: 600 },
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden',
              zIndex: 1000,
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BotIcon />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    FRA Atlas Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Ask me anything!
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton size="small" onClick={toggleMinimize} sx={{ color: 'white' }}>
                  <MinimizeIcon />
                </IconButton>
                <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 2,
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5
                  }}
                >
                  {/* Welcome Message */}
                  {showWelcome && messages.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <BotIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1, color: '#667eea' }}>
                        Welcome! 👋
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        I'm here to help you with FRA Atlas
                      </Typography>

                      {/* Topic Cards */}
                      {topics.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
                          {topics.slice(0, 6).map((topic) => (
                            <Chip
                              key={topic.id}
                              label={`${topic.icon} ${topic.name}`}
                              onClick={() => handleTopicClick(topic.name)}
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  background: '#667eea',
                                  color: 'white'
                                }
                              }}
                              size="small"
                            />
                          ))}
                        </Box>
                      )}

                      {/* Quick Questions */}
                      {quickQuestions.length > 0 && (
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Quick questions:
                          </Typography>
                          {quickQuestions.map((question, index) => (
                            <Chip
                              key={index}
                              label={question}
                              onClick={() => handleQuickQuestion(question)}
                              variant="outlined"
                              size="small"
                              sx={{
                                mb: 0.5,
                                mr: 0.5,
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#f0f0f0'
                                }
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Messages */}
                  {messages.map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                        gap: 1
                      }}
                    >
                      {!msg.isUser && (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                          <BotIcon fontSize="small" />
                        </Avatar>
                      )}
                      <Box
                        sx={{
                          maxWidth: '75%',
                          backgroundColor: msg.isUser
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'white',
                          background: msg.isUser
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'white',
                          color: msg.isUser ? 'white' : 'text.primary',
                          p: 1.5,
                          borderRadius: 2,
                          borderBottomRightRadius: msg.isUser ? 4 : undefined,
                          borderBottomLeftRadius: !msg.isUser ? 4 : undefined,
                          boxShadow: 1
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            '& strong': {
                              fontWeight: 600,
                              color: msg.isUser ? 'white' : '#667eea'
                            },
                            '& code': {
                              backgroundColor: msg.isUser ? 'rgba(255,255,255,0.2)' : '#f1f3f5',
                              padding: '2px 6px',
                              borderRadius: 1,
                              fontFamily: 'monospace',
                              fontSize: '0.85em'
                            }
                          }}
                        >
                          {msg.text}
                        </Typography>
                        {!msg.isUser && msg.confidence && (
                          <Chip
                            label={`${Math.round(msg.confidence * 100)}% confident`}
                            size="small"
                            sx={{
                              mt: 1,
                              height: 20,
                              fontSize: '0.7rem',
                              backgroundColor: '#4ade80',
                              color: 'white'
                            }}
                          />
                        )}
                      </Box>
                      {msg.isUser && (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#FF9800' }}>
                          <PersonIcon fontSize="small" />
                        </Avatar>
                      )}
                    </Box>
                  ))}

                  {/* Loading Indicator with Three Dots */}
                  {isLoading && (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                        <BotIcon fontSize="small" />
                      </Avatar>
                      <Paper sx={{ 
                        p: 1.5, 
                        display: 'flex', 
                        gap: 0.5,
                        minWidth: 80
                      }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#667eea',
                            animation: 'bounce 1.4s infinite',
                            '@keyframes bounce': {
                              '0%, 80%, 100%': {
                                transform: 'scale(0)'
                              },
                              '40%': {
                                transform: 'scale(1.0)'
                              }
                            }
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#667eea',
                            animation: 'bounce 1.4s infinite',
                            animationDelay: '0.2s',
                            '@keyframes bounce': {
                              '0%, 80%, 100%': {
                                transform: 'scale(0)'
                              },
                              '40%': {
                                transform: 'scale(1.0)'
                              }
                            }
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#667eea',
                            animation: 'bounce 1.4s infinite',
                            animationDelay: '0.4s',
                            '@keyframes bounce': {
                              '0%, 80%, 100%': {
                                transform: 'scale(0)'
                              },
                              '40%': {
                                transform: 'scale(1.0)'
                              }
                            }
                          }}
                        />
                      </Paper>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: 'white',
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Ask me anything..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3
                        }
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => sendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                        },
                        '&:disabled': {
                          background: '#e0e0e0'
                        }
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Paper>
        </Slide>
      )}
    </>
  );
};

export default ChatWidget;
