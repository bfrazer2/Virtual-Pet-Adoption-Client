// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';

//Auth0 Imports
import { Auth0Provider } from '@auth0/auth0-react';

//Native Imports
//Styles
import './index.css';
//Components
import { App } from './App';

const domain = process.env.REACT_APP_AUTH0_BASE_URL as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
