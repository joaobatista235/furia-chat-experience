import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': {
    height: '100%',
    width: '100%',
  },
  body: {
    fontFamily: '$system',
    backgroundColor: '$background',
    color: '$text',
  },
}); 