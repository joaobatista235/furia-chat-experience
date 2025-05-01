import { styled } from '../stitches.config';

export const LiveMatchContainer = styled('div', {
  backgroundColor: '#1A1A2E',
  borderRadius: '12px',
  padding: '20px',
  margin: '16px 0',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  color: '#fff',
});

export const MatchHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '0 10px',

  h2: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#E94560',
    fontWeight: 'bold',
  },
});

export const Timer = styled('div', {
  backgroundColor: '#E94560',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
});

export const TeamsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  padding: '20px',
  backgroundColor: '#16213E',
  borderRadius: '8px',
  gap: '10px',
});

export const Team = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,

  img: {
    width: '100px',
    height: '100px',
    marginBottom: '12px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    objectFit: 'contain',
    objectPosition: 'center',
    maxWidth: '100%',
  },

  h3: {
    margin: '0 0 8px 0',
    fontSize: '1.1rem',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const Score = styled('div', {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#E94560',
  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  marginTop: '-10px',
  marginBottom: '20px',
  width: '100%',
  textAlign: 'center',

  '&::before, &::after': {
    content: '',
    flex: 1,
    height: '2px',
    backgroundColor: '#E94560',
    opacity: 0.3,
  },
});

export const VS = styled('div', {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#E94560',
  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: '#0F3460',
  borderRadius: '50%',
  margin: '0 10px',
});

export const EventsContainer = styled('div', {
  marginTop: '20px',
  padding: '16px',
  backgroundColor: '#16213E',
  borderRadius: '8px',
  maxHeight: '200px',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#0F3460',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#E94560',
    borderRadius: '3px',
  },
});

export const Event = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '6px',
  backgroundColor: '#1A1A2E',
  transition: 'all 0.2s ease',

  '&:hover': {
    transform: 'translateX(4px)',
  },

  variants: {
    type: {
      kill: {
        borderLeft: '4px solid #FF4C29',
      },
      round: {
        borderLeft: '4px solid #2ECC71',
      },
      bomb: {
        borderLeft: '4px solid #F1C40F',
      },
    },
  },

  '.time': {
    color: '#E94560',
    fontSize: '0.9rem',
    marginRight: '12px',
    fontWeight: 'bold',
    minWidth: '60px',
  },

  '.description': {
    color: '#fff',
    fontSize: '0.9rem',
  },
}); 