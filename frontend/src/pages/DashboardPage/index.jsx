import React from "react";
import { getUserDetails } from "../../utils/api";

export function DashboardPage({ history }) {
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
        <div>
            <h1>Dashboard Page</h1>
        </div>
    );
}