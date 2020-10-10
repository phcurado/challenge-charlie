import React from 'react';
import { render } from 'react-dom';
import App from './app';

const Wrap = () => <App />;

render(<Wrap />, document.querySelector('.main'));
