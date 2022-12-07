import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/antd.min.css";
import "./globalAnti.css"
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux';

import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  orange } from '@mui/material/colors';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}




const outerTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },

  direction:"rtl",

  typography:{
    fontFamily:`"Cairo", sans-serif`
  },

  components: {
    // Name of the component
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          /*":hover":{
            border: '8px solid red',

            
          },*/

        },
      },
    },
    MuiPagination:{
      styleOverrides:{
        ul:{
          "justifyContent": "center"
        }
      },
    },

    

  },
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider theme={outerTheme}>

      <StyledEngineProvider injectFirst >
        <Provider  store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>

  </React.StrictMode>
);


