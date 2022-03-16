import React from 'react';
import { Route,Navigate } from 'react-router-dom';
import { isAuth } from './authhelpers';

const PrivateRoute =({component: Component,...rest})=> (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props}/>
            ):(
                <Navigate
                    to={{
                        pathname:"/admin"
                    }}
                />
            )
        }
    />
)

export default PrivateRoute;
