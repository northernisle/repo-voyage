import React from 'react';
import classnames from 'classnames';

import styles from '../error.module.scss';

class RateLimitError extends React.Component {
  constructor(props) {
    super(props);

    this.headers = props.headers;
    this.inverval = null;

    this.state = {
      message: this.error?.response.data.message,
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
      counter: resetDate - currentDate,
      message: "The engine has overheated. We'll have to let it cool down."
    });

    this.inverval = setInterval(() => {
      this.tick();
    }, 1000);
  };

  tick () {
    if (this.state.counter > 1) {
      this.setState(prevState => ({
        counter: prevState.counter - 1
      }));
    } else {
      clearInterval(this.interval);

      this.props.restore();
    }
  };

  render() {
    return (
      <>
        <p className={styles.text}>{this.state.message}</p>
        {this.state.counter && (
          <p className={classnames(styles.text, styles.counter)}>
            We'll beam you back where you were in: {this.state.counter}
          </p>
        )}
      </>
    );
  }
}

export default RateLimitError;
