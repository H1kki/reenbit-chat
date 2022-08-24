import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes/routes";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    if(loading) return <h1>Loading</h1>
    return user ?
        (
            <Switch>
                {publicRoutes.map(({path, component, exact}) => <Route
                    path={path} component={component} exact={exact} key={path}
                />)}
                <Redirect to={'/chat'}/>
            </Switch>
        )
        :
        (
            <Switch>
                {privateRoutes.map(({path, component, exact}) => <Route
                    path={path} component={component} exact={exact} key={path}
                />)}
                <Redirect to={'/login'}/>
            </Switch>
        )
};

export default AppRouter;