import React from "react";
import '../index.css';
import { Button, SvgIcon } from '@mui/material';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

export function LandingPage(props) {
    const login = () => window.location.href = 'http://localhost:3001/api/auth/discord';
    return (
        <div className="container">
            <div className="loginBox">
                <div className="loginText">
                    <SvgIcon component={VpnKeyRoundedIcon} sx={{ fontSize: 50 }} inheritViewBox />
                    <h1>Login with Discord</h1>
                </div>
                <div>
                    <Button variant="contained" sx={{ width: "50%", minWidth: 200, marginTop: 10 }} onClick={login}>Login</Button>
                </div>
            </div>
        </div>
    )
}