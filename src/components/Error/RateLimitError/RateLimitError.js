import React from 'react';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

import styles from '../error.module.scss';

class RateLimitError extends React.Component {
  constructor(props) {
    super(props);

    this.headers = props.headers;
    this.interval = null;

    this.state = {
      counter: null
    };
  }

  componentDidMount() {
    this.processError();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  processError = () => {
    const resetDate = this.headers['x-ratelimit-reset'];
    const currentDate = Math.floor(Date.now() / 1000);

    this.setState({
      counter: resetDate - currentDate
    });

    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  };

  tick() {
    if (this.state.counter > 1) {
      this.setState(prevState => ({
        counter: prevState.counter - 1
      }));
    } else {
      clearInterval(this.interval);

      setTimeout(this.props.restore, 300);
    }
  }

  render() {
    return (
      <>
        <p className={styles.text}>
          {this.props.t("The engine has overheated. We'll have to let it cool down.")}
        </p>
        {this.state.counter && (
          <p className={classnames(styles.text, styles.counter)}>
            {this.props.t("We'll beam you back where you were in")}: {this.state.counter}
          </p>
        )}
      </>
    );
  }
}

export default withTranslation()(RateLimitError);
