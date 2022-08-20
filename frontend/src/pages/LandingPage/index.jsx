import React from "react";
import { Button } from '@mui/material';

export function LandingPage(props) {
    const login = () => window.location.href = 'http://localhost:3001/api/auth/discord';
    return (
        <Button variant="contained" onClick={login}>Login</Button>
    )
}