import React from 'react';
import { render } from 'react-dom';
import App from '@/application';

const Wrap = () => <App />;

render(<Wrap />, document.querySelector('.main'));
