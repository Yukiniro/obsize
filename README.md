# obsize

`obsize` is a tiny library that observes an element's size change.

## [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API#browser_compatibility)

- Chrome (64+)
- Edge (79+)
- Firefox (69+)
- Opera (51+)
- Safari (13.1+)

## Install

```shell
pnpm add obsize -S
npm install obsize -S
yarn add obsize -S
```

## Useage

```javascript
import { observe } from "../../src/index";

const unobserve = observe(element, () => { console.log('trigger') });

// call unobserve could remove the observe
unobserve()
```

## API

### `observe`

Observe the size of specified elements.

- Params
  - `element` - The element to be observer.
  - `fn` - The function to call when the element's size has changed.
  - `options` - Others cofnig.
    - `once` - It will auto-remove the observer when `fn` has been called.

### `clear`

Clear all observers for any elements.

## License

MIT license.