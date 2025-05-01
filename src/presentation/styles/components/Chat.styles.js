import { styled } from '../stitches.config';

export const ChatContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '$background',
  color: '$text',
  fontFamily: '$system',
});

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$4',
  backgroundColor: '$primary',
  borderBottom: '1px solid $border',
});

export const Logo = styled('img', {
  width: '40px',
  height: '40px',
  marginRight: '$3',
});

export const Title = styled('h1', {
  margin: 0,
  fontSize: '$4',
  color: '$text',
  fontWeight: 'bold',
});

export const LiveIndicator = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#E94560',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  letterSpacing: '0.5px',

  '.dot': {
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    marginRight: '6px',
    animation: 'pulse 1.5s infinite',
  },

  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
});

export const MessagesContainer = styled('div', {
  flex: 1,
  padding: '$3',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const MessageBubble = styled('div', {
  padding: '$2 $3',
  borderRadius: '$2',
  maxWidth: '70%',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.5',

  variants: {
    type: {
      bot: {
        backgroundColor: '$secondary',
        alignSelf: 'flex-start',
        fontSize: '0.95rem',
      },
      user: {
        backgroundColor: '$accent',
        alignSelf: 'flex-end',
      },
    },
  },
});

export const InputContainer = styled('div', {
  padding: '$3',
  borderTop: '1px solid $border',
  display: 'flex',
  gap: '$2',
});

export const Input = styled('input', {
  flex: 1,
  padding: '$2 $3',
  borderRadius: '$2',
  border: '1px solid $border',
  backgroundColor: '$secondary',
  color: '$text',
  fontSize: '$2',
  outline: 'none',

  '&:focus': {
    borderColor: '$accent',
  },
});

export const Button = styled('button', {
  padding: '$2 $3',
  borderRadius: '$2',
  border: 'none',
  backgroundColor: '$accent',
  color: '$text',
  fontSize: '$2',
  cursor: 'pointer',
  transition: 'opacity 0.2s',

  '&:hover': {
    opacity: 0.8,
  },
}); 