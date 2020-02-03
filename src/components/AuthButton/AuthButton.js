import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { removeToken } from '../../redux/actions';

const clientId = process.env.CLIENT_ID;
const baseUrl = process.env.BASE_URL;
const state = 'almond_milk';

const AuthButton = ({ token, removeToken, ...props }) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(!!token);
  }, [token]);

  const handleAuthClick = () => {
    if (signedIn) {
      return removeToken();
    }

    const { pathname, search } = window.location;
    const redirectParam = encodeURI(pathname + search);

    const authUrl = `${baseUrl}/auth?redirectTo=${redirectParam}`;

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${authUrl}&state=${state}&scope=repo`;
    window.location.replace(url);
  };

  if (!clientId || !baseUrl) {
    return null;
  }

  return (
    <Button className={props.className} onClick={handleAuthClick}>
      {signedIn ? 'Sign out' : 'Sign in'}
    </Button>
  );
};

export default connect(({ token }) => ({ token }), { removeToken })(AuthButton);