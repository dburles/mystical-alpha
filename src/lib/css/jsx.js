'use strict';

const React = require('react');
const MysticalCSSProp = require('./MysticalCSSProp.js');

const jsx = (type, props, ...children) => {
  const { css, ...rest } = props || {};

  const element = React.createElement(type, rest, ...children);

  return css
    ? React.createElement(MysticalCSSProp, { css, key: rest.key }, element)
    : element;
};

module.exports = jsx;