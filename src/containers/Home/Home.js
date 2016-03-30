import React, { Component } from 'react';
// import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';
import  {Forecast, Outfits} from 'containers';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>


            <GithubButton user="erikras"
              repo="react-redux-universal-hot-example"
              type="star"
              width={160}
              height={30}
              count
              large
            />
            <GithubButton user="erikras"
              repo="react-redux-universal-hot-example"
              type="fork"
              width={160}
              height={30}
              count
              large
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>

        <div>
            <Outfits />
        </div>
        <div>
            <Forecast />
        </div>

        </div>
      </div>
    );
  }
}
