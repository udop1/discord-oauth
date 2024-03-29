import React from "react";
import './index.css';
//import { Button, SvgIcon } from '@mui/material';
import { getUserDetails } from "../../utils/api";

export function DashboardPage({ history }) {
    //eslint-disable-next-line no-unused-vars
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                //console.log(data);
                setUser(data);
                setLoading(false);
            }).catch((error) => {
                //console.log(error);
                history.push('/');
                setLoading(false);
            });
    }, [history, setUser]);

    return !loading && (
        <div className="container">
            <h1>Dashboard Page</h1>
        </div>
    );
}