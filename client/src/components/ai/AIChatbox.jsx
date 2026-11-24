import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Chip,
  Avatar,
  Fade,
  Zoom,
  Tooltip,
  Paper,
  CircularProgress,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SchoolIcon from '@mui/icons-material/School';
import aiService from '../../services/ai.service.js';

// Suggested quick prompts per role
const QUICK_PROMPTS = {
  student: [
    { label: "⚡ Newton's Laws", text: "Explain Newton's three laws of motion with examples." },
    { label: '📋 Attendance Rules', text: 'What is the minimum attendance requirement and policy?' },
    { label: '📐 Quadratic Formula', text: 'Can you explain the quadratic formula and discriminant?' },
    { label: '💡 Exam Study Tips', text: 'Give me top high-performance study tips for my upcoming exams.' },
    { label: '📝 Homework Help', text: 'How do assignment submissions and deadlines work?' },
  ],
  teacher: [
    { label: '👩‍🏫 Lesson Plan Outline', text: 'Help me draft a 50-minute interactive lesson plan framework.' },
    { label: '📋 Attendance Policies', text: 'What are the attendance rules and medical leave criteria?' },
    { label: '📝 Assignment Rubric', text: 'What is a standard grading rubric for science projects?' },
    { label: '💡 Student Engagement', text: 'Give me effective tips to motivate quiet students in class.' },
  ],
  parent: [
    { label: '👨‍👩‍👧 Child Progress', text: 'How can I best monitor my child academic performance?' },
    { label: '📋 Attendance Rules', text: 'What happens if my child misses classes due to medical reasons?' },
    { label: '💡 Home Study Support', text: 'How can parents support focused study habits at home?' },
  ],
};

/**
 * Luxury Gold & Black Formatted Message Renderer.
 */
const FormattedMessage = ({ content }) => {
  if (!content) return null;

  // Split lines and format headers, bullet points, and bold text
  const lines = content.split('\n');

  return (
    <Box sx={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#F1F5F9' }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <Box key={idx} sx={{ height: 6 }} />;
        }

        // H3 Header (### ...)
        if (trimmed.startsWith('### ')) {
          return (
            <Typography
              key={idx}
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FBBF24',
                mt: idx === 0 ? 0 : 1,
                mb: 0.5,
                letterSpacing: '0.3px',
              }}
            >
              {trimmed.replace('### ', '')}
            </Typography>
          );
        }

        // Bullet point (- ... or * ...)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const text = trimmed.substring(2);
          return (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5, pl: 0.5 }}>
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: '#F59E0B',
                  mt: '8px',
                  mr: 1,
                  flexShrink: 0,
                }}
              />
              <Typography sx={{ fontSize: '0.86rem', color: '#E2E8F0' }}>
                <InlineBoldText text={text} />
              </Typography>
            </Box>
          );
        }

        // Numbered list (1. ... or 2. ...)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5, pl: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#F59E0B',
                  fontSize: '0.85rem',
                  mr: 1,
                  minWidth: 16,
                  flexShrink: 0,
                }}
              >
                {numMatch[1]}.
              </Typography>
              <Typography sx={{ fontSize: '0.86rem', color: '#E2E8F0' }}>
                <InlineBoldText text={numMatch[2]} />
              </Typography>
            </Box>
          );
        }

        // Regular line
        return (
          <Typography key={idx} sx={{ fontSize: '0.86rem', color: '#E2E8F0', mb: 0.3 }}>
            <InlineBoldText text={trimmed} />
          </Typography>
        );
      })}
    </Box>
  );
};

/**
 * Helper to parse bold (**word**) and italic (*word*) in text strings.
 */
const InlineBoldText = ({ text }) => {
  // Regex to match **bold** or *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Box component="span" key={i} sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          {part.slice(2, -2)}
        </Box>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <Box component="span" key={i} sx={{ fontStyle: 'italic', color: '#CBD5E1' }}>
          {part.slice(1, -1)}
        </Box>
      );
    }
    return part;
  });
};

/**
 * Helper to determine initial user role and name.
 */
const getInitialUserInfo = () => {
  try {
    const storedUser = localStorage.getItem('school_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      return {
        role: parsed.role || 'student',
        name: parsed.name || '',
      };
    }
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/teacher')) return { role: 'teacher', name: '' };
    if (path.includes('/parent')) return { role: 'parent', name: '' };
    return { role: 'student', name: '' };
  } catch {
    return { role: 'student', name: '' };
  }
};

/**
 * AIChatbox Component
 * Interactive Floating Luxury AI Assistant Widget.
 */
export const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [{ role: userRole, name: userName }] = useState(getInitialUserInfo);
  const [messages, setMessages] = useState(() => {
    const info = getInitialUserInfo();
    const roleGreeting =
      info.role === 'teacher' ? 'Faculty Member' : info.role === 'parent' ? 'Parent' : 'Student';
    return [
      {
        id: 'welcome',
        sender: 'ai',
        text: `Hello ${info.name ? info.name : roleGreeting}! 👋\n\nI am your **Smart School AI Assistant**, powered by Gemini academic intelligence.\n\nHow can I help you today? You can ask me about **curriculum topics**, **attendance guidelines**, **exam preparation**, or select one of the suggested prompts below!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen, isMinimized]);

  // Send message handler
  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend.trim() : inputMessage.trim();
    if (!query || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      // Build history for context
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({ sender: m.sender, text: m.text }));

      const response = await aiService.sendMessage(query, history, userRole);
      const replyText = response?.reply || 'I am processing your query. Please ask again if needed.';

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('[AIChatbox Error]:', err);
      const errorMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `I encountered a momentary connectivity issue. However, here is what you can do:\n- Verify your internet connection.\n- Try rephrasing your academic query.\n- Feel free to ask another school or subject question!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Copy text to clipboard
  const handleCopy = (text, idx) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  // Clear chat thread
  const handleClear = () => {
    const roleGreeting =
      userRole === 'teacher' ? 'Faculty Member' : userRole === 'parent' ? 'Parent' : 'Student';
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat session reset. Hello ${userName ? userName : roleGreeting}! How may I assist you now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const prompts = QUICK_PROMPTS[userRole] || QUICK_PROMPTS.student;

  return (
    <>
      {/* ── Floating Action Launcher Button ──────────────────────────────────── */}
      {!isOpen && (
        <Zoom in={!isOpen}>
          <Box
            sx={{
              position: 'fixed',
              bottom: { xs: 20, sm: 28 },
              right: { xs: 20, sm: 28 },
              zIndex: 1300,
            }}
          >
            <Tooltip title="Ask Smart School AI" placement="left" arrow>
              <Box
                onClick={() => {
                  setIsOpen(true);
                  setIsMinimized(false);
                }}
                sx={{
                  position: 'relative',
                  width: { xs: 56, sm: 62 },
                  height: { xs: 56, sm: 62 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45), 0 0 15px rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    transform: 'scale(1.08) translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(245, 158, 11, 0.6), 0 0 25px rgba(251, 191, 36, 0.5)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(245, 158, 11, 0.6)',
                    animation: 'pulseRing 2s infinite ease-out',
                  },
                  '@keyframes pulseRing': {
                    '0%': { transform: 'scale(1)', opacity: 0.8 },
                    '100%': { transform: 'scale(1.4)', opacity: 0 },
                  },
                }}
              >
                <AutoAwesomeIcon sx={{ color: '#0A0D14', fontSize: { xs: 28, sm: 32 } }} />

                {/* AI Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    bgcolor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    px: 0.7,
                    py: 0.2,
                    borderRadius: '10px',
                    border: '2px solid #0A0D14',
                    letterSpacing: '0.5px',
                  }}
                >
                  AI
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Zoom>
      )}

      {/* ── Minimized Floating Bar ───────────────────────────────────────────── */}
      {isOpen && isMinimized && (
        <Fade in={isMinimized}>
          <Box
            onClick={() => setIsMinimized(false)}
            sx={{
              position: 'fixed',
              bottom: { xs: 20, sm: 28 },
              right: { xs: 20, sm: 28 },
              zIndex: 1300,
              bgcolor: '#121722',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '28px',
              px: 2.5,
              py: 1.2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(245, 158, 11, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#F59E0B',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #F59E0B',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#F59E0B', fontSize: 16 }} />
            </Avatar>
            <Box>
              <Typography sx={{ color: '#F8FAFC', fontSize: '0.85rem', fontWeight: 700 }}>
                School AI Assistant
              </Typography>
              <Typography sx={{ color: '#10B981', fontSize: '0.7rem', fontWeight: 500 }}>
                ● Active (Click to open)
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              sx={{ color: '#94A3B8', ml: 1, '&:hover': { color: '#EF4444' } }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Fade>
      )}

      {/* ── Main Chat Window ─────────────────────────────────────────────────── */}
      {isOpen && !isMinimized && (
        <Fade in={isOpen && !isMinimized}>
          <Paper
            elevation={24}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              width: { xs: 'calc(100vw - 32px)', sm: 410 },
              height: { xs: 'calc(100vh - 90px)', sm: 600 },
              maxHeight: '85vh',
              zIndex: 1300,
              bgcolor: 'rgba(14, 18, 27, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.18)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #121722 0%, #1a2232 100%)',
                borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: 'rgba(245, 158, 11, 0.15)',
                    border: '1.5px solid #F59E0B',
                    boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <SmartToyIcon sx={{ color: '#FBBF24', fontSize: 22 }} />
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.92rem' }}>
                      Smart School AI
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        px: 0.8,
                        py: 0.1,
                        bgcolor: 'rgba(245, 158, 11, 0.2)',
                        color: '#FBBF24',
                        borderRadius: '6px',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {userRole}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.2 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#10B981',
                        boxShadow: '0 0 6px #10B981',
                      }}
                    />
                    <Typography sx={{ color: '#94A3B8', fontSize: '0.72rem' }}>
                      Gemini Academic Engine
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Window Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title="Clear chat">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{ color: '#94A3B8', '&:hover': { color: '#FBBF24' } }}
                  >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Minimize">
                  <IconButton
                    size="small"
                    onClick={() => setIsMinimized(true)}
                    sx={{ color: '#94A3B8', '&:hover': { color: '#FBBF24' } }}
                  >
                    <RemoveIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton
                    size="small"
                    onClick={() => setIsOpen(false)}
                    sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444' } }}
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Quick Prompt Chips */}
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: '#0a0d14',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(245, 158, 11, 0.2)', borderRadius: 2 },
              }}
            >
              {prompts.map((p, idx) => (
                <Chip
                  key={idx}
                  label={p.label}
                  size="small"
                  onClick={() => handleSendMessage(p.text)}
                  clickable
                  sx={{
                    bgcolor: 'rgba(245, 158, 11, 0.08)',
                    color: '#FBBF24',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(245, 158, 11, 0.2)',
                      borderColor: '#F59E0B',
                      transform: 'translateY(-1px)',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Chat Messages Body */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#0c1018',
                '&::-webkit-scrollbar': { width: 5 },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(245, 158, 11, 0.25)',
                  borderRadius: 3,
                },
              }}
            >
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';

                return (
                  <Box
                    key={msg.id || index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '88%',
                        position: 'relative',
                        p: 1.6,
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: isUser
                          ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                          : '#131924',
                        color: isUser ? '#0A0D14' : '#F8FAFC',
                        boxShadow: isUser
                          ? '0 4px 15px rgba(245, 158, 11, 0.3)'
                          : '0 4px 20px rgba(0, 0, 0, 0.4)',
                        border: isUser
                          ? 'none'
                          : '1px solid rgba(245, 158, 11, 0.2)',
                        borderLeft: !isUser ? '3px solid #F59E0B' : undefined,
                      }}
                    >
                      {/* Sender label / header for AI */}
                      {!isUser && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 0.8,
                            pb: 0.6,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                            <SchoolIcon sx={{ color: '#F59E0B', fontSize: 16 }} />
                            <Typography
                              sx={{
                                color: '#FBBF24',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.4px',
                              }}
                            >
                              ACADEMIC ADVISOR
                            </Typography>
                          </Box>

                          <Tooltip title={copiedIdx === index ? 'Copied!' : 'Copy response'}>
                            <IconButton
                              size="small"
                              onClick={() => handleCopy(msg.text, index)}
                              sx={{
                                color: '#94A3B8',
                                p: 0.3,
                                '&:hover': { color: '#FBBF24' },
                              }}
                            >
                              {copiedIdx === index ? (
                                <CheckIcon sx={{ fontSize: 14, color: '#10B981' }} />
                              ) : (
                                <ContentCopyIcon sx={{ fontSize: 14 }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}

                      {/* Content */}
                      {isUser ? (
                        <Typography
                          sx={{
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            lineHeight: 1.5,
                            color: '#0A0D14',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {msg.text}
                        </Typography>
                      ) : (
                        <FormattedMessage content={msg.text} />
                      )}

                      {/* Message Footer */}
                      <Typography
                        sx={{
                          display: 'block',
                          textAlign: isUser ? 'right' : 'left',
                          fontSize: '0.68rem',
                          color: isUser ? '#2d2208' : '#64748B',
                          mt: 0.8,
                          fontWeight: 500,
                        }}
                      >
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}

              {/* AI Thinking Animation */}
              {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid #F59E0B',
                    }}
                  >
                    <SmartToyIcon sx={{ color: '#F59E0B', fontSize: 16 }} />
                  </Avatar>
                  <Box
                    sx={{
                      p: 1.2,
                      px: 2,
                      bgcolor: '#131924',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                    }}
                  >
                    <CircularProgress size={14} sx={{ color: '#F59E0B' }} />
                    <Typography sx={{ color: '#FBBF24', fontSize: '0.8rem', fontWeight: 600 }}>
                      AI is generating scholarly response...
                    </Typography>
                  </Box>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>

            {/* Input Bar */}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              sx={{
                p: 1.5,
                bgcolor: '#0e131d',
                borderTop: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about physics, homework, attendance, exams..."
                disabled={loading}
                autoComplete="off"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#161c28',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontSize: '0.86rem',
                    '& fieldset': {
                      borderColor: 'rgba(245, 158, 11, 0.25)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(245, 158, 11, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#F59E0B',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.25)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#64748B',
                    fontSize: '0.82rem',
                  },
                }}
              />

              <IconButton
                type="submit"
                disabled={!inputMessage.trim() || loading}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: inputMessage.trim() && !loading
                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: inputMessage.trim() && !loading ? '#0A0D14' : '#475569',
                  boxShadow: inputMessage.trim() && !loading
                    ? '0 4px 15px rgba(245, 158, 11, 0.4)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: inputMessage.trim() && !loading
                      ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>

            {/* Bottom Status bar */}
            <Box
              sx={{
                px: 2,
                py: 0.5,
                bgcolor: '#080a10',
                borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#64748B', fontSize: '0.66rem', textAlign: 'center' }}>
                Smart School Connect • AI Academic Advisor • Press Enter to send
              </Typography>
            </Box>
          </Paper>
        </Fade>
      )}
    </>
  );
};

export default AIChatbox;
