import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { LandingPage, DashboardPage } from './pages';

function App() {
    return (
        <Switch>
            <Route path="/" exact={ true } component={ LandingPage } />
            <Route path="/dashboard" exact={ true } component={ DashboardPage } />
        </Switch>
    );
}

export default App;
