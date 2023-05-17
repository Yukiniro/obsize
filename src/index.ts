import { nanoid } from "nanoid";

type Size = { width: number; height: number };
type ListenItem = { key: string; once: boolean; fn: ListenHandler };

type ListenHandler = () => Size;
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
  const elementFns = map.get(element) || [];
  const key = nanoid();
  const { once } = options;

  if (elementFns.length === 0) {
    obs.observe(element);
  }

  elementFns.push({ key, once, fn });
  return () => {
    const fns = map.get(element).filter((item: ListenItem) => {
      return item.key !== key;
    });
    if (fns.length === 0) {
      map.delete(element);
      obs.unobserve(element);
    } else {
      map.set(element, fns);
    }
  };
}

function clear() {
  map.clear();
  obs.disconnect();
}

export { listen, clear };
