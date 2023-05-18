# resize-listener

`resize-listener` is a tiny library that observes an element's size change.

## [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API#browser_compatibility)

- Chrome (64+)
- Edge (79+)
- Firefox (69+)
- Opera (51+)
- Safari (13.1+)

## Install

```shell
pnpm add resize-listener -S
npm install resize-listener -S
yarn add resize-listener -S
```

## Useage

```javascript
import { listen } from "../../src/index";

const unlisten = listen(element, () => { console.log('trigger') });

// call unlisten could remove the listener
unlisten()
```

## API

### `listen`

Observe the size of specified elements.

- Params
  - `element` - The element to be observer.
  - `fn` - The function to call when the element's size has changed.
  - `options` - Others cofnig.
    - `once` - It will auto-remove the listener when `fn` has been called.

### `clear`

Clear all listeners for any elements.

## License

MIT license.