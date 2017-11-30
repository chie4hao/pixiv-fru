import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { shell } from 'electron';
import styles from './AboutPage.css';

const input = `#### Version: &emsp;1.0.0
#### Developer: &emsp;chie_4
### Source Code : &emsp;[https://github.com/chie4hao/pixiv-fru](https://github.com/chie4hao/pixiv-fru)
`;

export default class About extends Component {
  componentDidMount() {
    const links = document.querySelectorAll('a[href]');

    Array.prototype.forEach.call(links, link => {
      const url = link.getAttribute('href');
      if (url.indexOf('http') === 0) {
        link.addEventListener('click', e => {
          e.preventDefault();
          shell.openExternal(url);
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 style={{ color: 'blue' }}>Pixiv-fru</h1>
        <ReactMarkdown source={input} />
      </div>
    );
  }
}
