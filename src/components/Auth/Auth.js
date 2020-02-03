import { useEffect } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const secretState = 'almond_milk';

const Auth = ({ setToken }) => {
  const { code, state, redirectTo } = qs.parse(window.location.search);
  const history = useHistory();

  useEffect(() => {
    if (state === secretState) {
      setToken(clientId, clientSecret, code, secretState);
    }

    history.replace(redirectTo);
  }, [code, setToken, history, state, redirectTo]);

  return null;
};

export default connect(undefined, { setToken })(Auth);
