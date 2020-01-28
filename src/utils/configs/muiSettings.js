import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#975c9f'
    },
    secondary: {
      main: '#d06580'
    }
  },
  typography: {
    fontFamily: ["'Maven Pro'", 'sans-serif'].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Maven Pro']
      }
    }
  }
});
