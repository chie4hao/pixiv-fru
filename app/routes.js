/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import App from './containers/App';
import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';

const input = `## About
### Author: chie_4
### Source Code : [https://github.com/chie4hao/pixiv-fru](https://github.com/chie4hao/pixiv-fru)
<a href="http://www.luoo.net/" target="_blank">落网</a>`;

function LinkRenderer(props) {
  return <a href={props.href} target="_blank">{props.children}</a>
}
/*
ReactDOM.render(
    <ReactMarkdown source={input} />,
    document.getElementById('container')
);
*/
const mapStateToProps = state => ({
  location: state.router.location
});

const ConnectedSwitch = connect(mapStateToProps)(Switch);


const asdf = () => (<div
  style={{
    textAlign: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 72px)',
    alignItems: 'center',
    display: 'flex',
  }}
>
  <ReactMarkdown source={input} renderers={{ Link: LinkRenderer }} />
</div>);

export default () => (
  <App>
    <ConnectedSwitch>
      <Route path="/about" component={asdf} />
      <Route path="/" component={HomePage} />
    </ConnectedSwitch>
  </App>
);
