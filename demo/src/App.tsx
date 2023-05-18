import { useEffect, useRef, useState } from "react";
import "./App.css";
import Slider from "./Slider";
import { listen } from "../../src/index";

function App() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const domRef = useRef(null);

  useEffect(() => {
    return listen(domRef.current as unknown as HTMLElement, () => {
      console.log("size changed");
    });
  }, []);

  return (
    <div>
      <h1>DEMO</h1>
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
