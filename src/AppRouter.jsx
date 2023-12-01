import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import BourbonView from './pages/BourbonView';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<BourbonView />} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
