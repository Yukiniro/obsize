type SliderProps = {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
};

function Slider(props: SliderProps) {
  const { title, min, max, value, onChange } = props;
  return (
    <div>
      {title}: {min}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {max}
    </div>
  );
}

export default Slider;
