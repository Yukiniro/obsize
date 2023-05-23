type ObserverItem = { once: boolean; fn: ObserverHandler };

type ObserverHandler = () => void;
type RemoveObserverHandler = () => void;

const map = new Map();
const obs = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;
    const fns = map.get(target);
    if (fns?.length) {
      const newFns = [];
      fns.forEach((item: ObserverItem) => {
        const { fn, once } = item;
        fn();
        if (!once) {
          newFns.push(item);
        }
      });
      map.set(target, newFns);
    }
  });
});

function observe(
  element: HTMLElement,
  fn: ObserverHandler,
  options = { once: false }
): RemoveObserverHandler {
  const isElementObserver = map.has(element);
  const elementFns = isElementObserver ? map.get(element) : [];
  const { once } = options;
  elementFns.push({ once, fn });
  if (!isElementObserver) {
    obs.observe(element);
    map.set(element, elementFns);
  }
  return () => {
    if (map.has(element)) {
      const fns = map.get(element).filter((item: ObserverItem) => {
        return item.fn !== fn;
      });
      if (fns.length === 0) {
        map.delete(element);
        obs.unobserve(element);
      } else {
        map.set(element, fns);
      }
    }
  };
}

function clear() {
  map.clear();
  obs.disconnect();
}

export { observe, clear };
