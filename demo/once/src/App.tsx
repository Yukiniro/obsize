import { useEffect, useRef, useState } from "react";
import "./App.css";
import Slider from "./Slider";
import { observe } from "../../../src/index";

function App() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const domRef = useRef(null);

  useEffect(() => {
    return observe(
      domRef.current as unknown as HTMLElement,
      () => {
        console.log("element size changed only once");
      },
      { once: true }
    );
  }, []);

  useEffect(() => {
    return observe(
      document.body as unknown as HTMLElement,
      () => {
        console.log("body size changed only once");
      },
      { once: true }
    );
  }, []);

  return (
    <div>
      <h1>DEMO</h1>
      <h2>Open console panel.</h2>
      <h3></h3>
      <Slider
        min={0}
        max={500}
        title="width"
        value={width}
        onChange={setWidth}
      />
      <Slider
        min={0}
        max={500}
        title="width"
        value={height}
        onChange={setHeight}
      />
      <div ref={domRef} style={{ width, height, background: "#F0F" }} />
    </div>
  );
}

export default App;
