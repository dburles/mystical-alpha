# 🌌 mystical

Build themeable, robust and maintainable React component libraries and applications following the [System UI Theme Specification](https://system-ui.com/theme/).

## Overview

- Mystical is a small (< 12 KB [size limited](https://github.com/ai/size-limit/)) runtime CSS-in-JS library, inspired by [theme-ui](https://theme-ui.com/). Built on [Emotion](https://emotion.sh/).
- A powerful, declarative approach to altering the styles of a component based on its props with the [useModifiers](#usemodifiers) hook.
- Color scheme support with a `prefers-color-scheme` media query listener which by default will automatically switch based on users system preferences. The [useColorMode](#usecolormode) hook can be used if you wish to switch in the browser.
- Array values for defining media query breakpoint values, e.g. `margin: [0, 3]`.

## Table of Contents

- [Installation](#install)
- [Getting Started](#getting-started)
  - [Context](#context)
  - [Example Component](#example-component)
- [Babel Configuration](#babel-configuration)
- [API](#api)
  - [Theme Object](#theme-object)
  - [CSS Prop](#css-prop)
    - [Theme Lookup](#theme-lookup)
    - [Dot Properties](#dot-properties)
    - [Shorthand Properties](#shorthand-properties)
    - [Media Queries](#media-queries)
  - [MysticalProvider](#mysticalprovider)
  - [Global](#global)
  - [keyframes](#keyframes)
  - [useTheme](#usetheme)
  - [useMystical](#usemystical)
  - [useModifiers](#usemodifiers)
  - [useColorMode](#usecolormode)
- [Contributors](#contributors)
- [License](#license)

## Install

`npm i mystical`

## Getting Started

##### Context

Wrap your app with [MysticalProvider](#mysticalprovider):

```js
// While named imports are available, deep imports result in a small bundle size
// regardless of the (often dubious) tree-shaking abilities of your bundler.
import MysticalProvider from 'mystical/public/MysticalProvider.js';

// Optional theme object
const theme = {
  // System UI theme values, See: https://system-ui.com/theme
};

const App = () => {
  return <MysticalProvider theme={theme}>...</MysticalProvider>;
};
```

##### Example Component

This `Button` component attempts to illustrate some of the important parts of the Mystical API:

1. A [`css` prop](#css-prop) that transforms CSS property values from the theme, (like [theme-ui](https://theme-ui.com/))
2. The concept of _modifiers_, the combination of a `modifiers` object with a [useModifiers hook](#usemodifiers). This makes prop based variations of components simple and declarative.

```js
import useModifiers from 'mystical/public/useModifiers.js';

const modifiers = {
  variant: {
    primary: {
      color: 'white',
      backgroundColor: 'blues.600', // These values are picked up off the theme
      ':hover:not(:disabled)': {
        backgroundColor: 'blues.500',
      },
      ':active:not(:disabled)': {
        backgroundColor: 'blues.700',
      },
    },
  },
  size: {
    small: {
      fontSize: 0,
      lineHeight: 'none',
      padding: '2 3', // Shorthand 1-4 properties such as padding are also translated to spacing values defined in the theme
    },
    medium: {
      fontSize: 1,
      lineHeight: 'normal',
      padding: '2 4',
    },
    large: {
      fontSize: 2,
      lineHeight: 'normal',
      padding: '3 5',
    },
  },
  shape: {
    square: { borderRadius: 1 },
    rounded: { borderRadius: 2 },
    pill: { borderRadius: 5 },
  },
};

const Button = ({
  variant = 'primary',
  size = 'small',
  shape = 'rounded',
  modifiers: customModifiers,
  ...props
}) => {
  const modifierStyle = useModifiers(
    { variant, size, shape },
    modifiers,
    customModifiers // optional
  );

  return (
    <button
      {...props}
      css={[
        // Objects passed within arrays are merged
        {
          color: 'white',
          fontFamily: 'body',
          border: 0,
          ':disabled': {
            opacity: 'disabled',
          },
        },
        modifierStyle,
      ]}
    />
  );
};
```

### Babel Configuration

#### Automatic (Recommended)

Configure [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) to use the `automatic` runtime and point the `importSource` to mystical.

Example [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) configuration:

```js
{
  runtime: 'automatic',
  importSource: 'mystical/public',
  development: process.env.NODE_ENV === 'development',
}
```

#### Classic

If you wish to use the `classic` runtime instead, just add the `@jsx` pragma and import the `jsx` function:

```js
/** @jsx jsx **/
import jsx from 'mystical/public/jsx.js';

const MyComponent = () => {
  // ...
};
```

## API

#### Theme Object

Your theme object should be structured following the convention outlined in the [System UI theme specification](https://system-ui.com/theme) in order for CSS values to be [automatically translated](#theme-lookup).

#### CSS Prop

This is the primary method of applying styles to components and elements.

```js
// Example theme:
const theme = {
  colors: {
    primary: '#1282A2',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  // etc
};

// `padding` is keyed to the `space` property of the theme and looks up the third index in the array.
// `backgroundColor` is keyed to the `colors` property of the theme.
const Component = () => (
  <div css={{ padding: 3, backgroundColor: 'primary' }}>...</div>
);
```

##### Theme Lookup

Just like [theme-ui](https://theme-ui.com/), values passed to CSS properties are automatically translated from the theme based on a [lookup map](https://github.com/dburles/mystical/blob/master/src/lib/themeTokens.js), and will default to the literal value if there's no match.

##### Dot Properties

Arrays and Object theme values can be retrieved by using dot properties:

```js
const theme = {
  colors: {
    red: ['#fed7d7', '#feb2b2', '#fc8181'],
  },
};

const Component = () => <div css={{ backgroundColor: 'red.2' }}>...</div>;
```

##### Shorthand Properties

CSS [Shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) that relate to edges of a box are also translated from the theme. That is: `margin`, `padding`, `borderWidth`, `borderRadius`, `borderColor` and `borderStyle`.

Given the following example:

```js
const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

const Component = () => <div css={{ margin: '3 5' }}>...</div>;
```

...the following style is generated: `margin: 16px 64px`

##### Media Queries

Instead of explicitly writing media queries, simply pass an array. Breakpoints can also be skipped, e.g. `['100%', , '25%']`.

```js
const Component = () => {
  // Applies width 100% to all viewport widths,
  // 50% above the first breakpoint,
  // and 25% above the next breakpoint
  return <div css={{ width: ['100%', '50%', '25%'] }}>...</div>;
};
```

##### Merging Styles

The css prop also accepts an array of style objects which are deeply merged in order:

```js
const Component = () => (
  <div css={[{ fontSize: 1 }, { fontSize: 2, color: 'white' }]}>...</div>
);
```

#### MysticalProvider

Your application must be wrapped with the `MysticalProvider` component:

```js
const App = () => {
  return <MysticalProvider>...</MysticalProvider>;
};
```

It accepts the following props:

- theme – The theme object
- options (optional)

```js
const options = {
  // Defaults:
  usePrefersColorScheme: true, // Sets color mode based on system preferences
};
```

#### Global

Global style component that automatically removes its styles when unmounted.

```js
import Global from 'mystical/public/Global.js';

const App = () => {
  return (
    <div>
      <Global
        styles={{
          body: {
            backgroundColor: 'white',
            border: 0,
          },
        }}
      />
      ...
    </div>
  );
};
```

#### keyframes

Install [@emotion/react](https://www.npmjs.com/package/@emotion/react) (`npm i @emotion/react`). See https://emotion.sh/docs/keyframes.

```js
import { keyframes } from '@emotion/react';

const animationName = keyframes({
  // ...
});

const Component = () => {
  return (
    <div
      css={{
        animationName,
        // etc
      }}
    >
      ...
    </div>
  );
};
```

#### useTheme

A simple way to pick out values from the theme similar to using the [`css` prop](#css-prop).

```js
import useTheme from 'mystical/public/useTheme.js';

const purple = useTheme('colors', 'purple');
```

#### useMystical

Provides access to the complete [theme object](#theme-object).

```js
import useMystical from 'mystical/public/useMystical.js';

const { theme } = useMystical();
```

#### useModifiers

A declarative API for handling prop based variations to component styles. This example demonstrates applying modifier styles to a component with multiple elements. See the [`Button` component above](#example-component) for another example.

```js
import useModifiers from 'mystical/public/useModifiers.js';

const modifiers = {
  // `default` is a special key for applying and overwriting default styles across each element (experimental).
  default: {
    title: { fontFamily: 'heading' },
    subtitle: { fontFamily: 'body' },
  },
  size: {
    small: {
      title: { fontSize: 3 },
      subtitle: { fontSize: 0 },
    },
    large: {
      title: { fontSize: 5 },
      subtitle: { fontSize: 2 },
    },
  },
};

const Component = ({ size = 'small', modifiers: customModifiers }) => {
  const modifierStyle = useModifiers(
    { size },
    modifiers,
    customModifiers // Optional secondary modifiers object that will merge with `modifiers`.
  );

  return (
    <div>
      <div css={modifierStyle.title}>{title}</div>
      <div css={modifierStyle.subtitle}>{subtitle}</div>
    </div>
  );
};
```

#### useColorMode

Allows for altering the color mode on the fly.

```js
import useColorMode from 'mystical/public/useColorMode.js';

const [colorMode, setColorMode] = useColorMode();
```

### Contributors

- [David Burles](https://github.com/dburles)
- [Alaister Young](https://github.com/alaister)
- [Jayden Seric](https://github.com/jaydenseric)

#### License

MIT
