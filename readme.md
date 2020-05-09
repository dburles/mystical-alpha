# 🌌 mystical-alpha

Build robust and maintainable React component libraries with ease and confidence.

## Overview

- Mystical is a small (_Todo: size_) runtime CSS-in-JS library, inspired heavily by [theme-ui](https://theme-ui.com/) but with a concise API.
- Purpose built and written from scratch (except vendor prefixing).
- Style with a just a CSS prop, begone `styled`!
- Atomic classes: Rather than serialising entire CSS objects (like emotion, styled-components, etc), instead, property:value pairs become reusable classes. This means that your application styles scale well with SSR or static site generation, a lot less data will be sent across the wire. Sticking with common theme values especially helps.
- Color scheme support with a `prefers-color-scheme` media query listener which by default will automatically switch based on users system preferences. The `useColorMode` hook can be used if you wish the ability to switch it manually.
- Responsive array values.
- `useModifiers` hook: A declarative API for handling prop based variations to component styles. It makes it simple to style individual elements within a single component from the outside. _Todo: Add an example of this_.

## Install

`npm i dburles/mystical-alpha#semver:^1.0.0`

## Getting Started

Wrap your app in mystical context using `MysticalProvider`:

```js
import { MysticalProvider } from 'mystical';

// Optional theme object
const theme = {
  // System UI theme values, See: https://system-ui.com/theme
};

// Optional options
const options = {
  // Defaults:
  disableCascade: false, // Disables cascading styles (experimental)
  usePrefersColorScheme: true, // Sets color mode based on system preferences
};

const App = () => {
  return (
    <MysticalProvider theme={theme} options={options}>
      ...
    </MysticalProvider>
  );
};
```

This `Button` component attempts to illustrate some of the important parts of the Mystical API:

1. A `css` prop that transforms CSS property values from the theme, (like [theme-ui](https://theme-ui.com/))
2. The concept of _modifiers_, the combination of a `modifiers` object with a `useModifiers` hook. This makes prop based variations of components simple and declarative.

```js
/** @jsx jsx **/
import { jsx, useModifiers } from 'mystical';

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

### API

Todo:

#### useMystical

#### useTheme

#### useModifiers

#### useColorMode

#### useCSS

#### useKeyframes

#### Global

#### cloneElement

#### createCache

### Defaults

Your theme object will be merged with the following defaults:

```js
const theme = {
  breakpoints: ['640px', '768px', '1024px', '1280px'],
  space: [
    '0px',
    '4px',
    '8px',
    '16px',
    '32px',
    '64px',
    '128px',
    '256px',
    '512px',
  ],
  fontSizes: [
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '32px',
    '48px',
    '64px',
    '72px',
  ],
};
```

### Server Side Rendering

Todo
