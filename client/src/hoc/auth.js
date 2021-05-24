import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
/* 
     예)  option: null -> 누구나 출입이 가능한 페이지
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저가 account 페이지 가려고 하면 막아준다
  */
// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option) {
    const AuthenticationCheck = props => {
        let user = useSelector(state => state.user);
        console.log('auth', user.login === undefined);
        let isAuth = localStorage.getItem('token');

        //Not Loggined in Status
        if (isAuth === null || user.login === undefined) {
            if (option) {
                props.history.push('/account');
            }
            //Loggined in Status
        } else {
            if (option === false) {
                props.history.push('/');
            }
        }

        return <SpecificComponent {...props} user={user} />;
    };
    return AuthenticationCheck;
}
