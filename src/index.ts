import { nanoid } from "nanoid";

type ListenItem = { key: string; once: boolean; fn: ListenHandler };

type ListenHandler = () => void;
type RemoveListenHandler = () => void;

const map = new Map();
const obs = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;
    const fns = map.get(target);
    if (fns?.length) {
      const newFns = [];
      fns.forEach((item: ListenItem) => {
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

function listen(
  element: HTMLElement,
  fn: ListenHandler,
  options = { once: false }
): RemoveListenHandler {
  const isElementObserver = map.has(element);
  const elementFns = isElementObserver ? map.get(element) : [];
  const key = nanoid();
  const { once } = options;
  elementFns.push({ key, once, fn });
  if (!isElementObserver) {
    obs.observe(element);
    map.set(element, elementFns);
  }
  return () => {
    if (map.has(element)) {
      const fns = map.get(element).filter((item: ListenItem) => {
        return item.key !== key;
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

export { listen, clear };
