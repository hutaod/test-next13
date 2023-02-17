import { useState } from "react";

const hex2rgb = (hex?: string, opacity = 1): string | undefined => {
  // hex 校验
  if (!hex || (hex.length !== 7 && hex.length !== 4)) {
    return;
  }
  // 透明度
  opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity;
  const rgbChar = ["r", "g", "b"];
  let rgb;

  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) {
    rgb = normal.slice(1).reduce((a, e, i) => {
      a[rgbChar[i]] = parseInt(e, 16);
      return a;
    }, {} as Record<string, number>);
  }

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) {
    rgb = shorthand.slice(1).reduce((a, e, i) => {
      a[rgbChar[i]] = 0x11 * parseInt(e, 16);
      return a;
    }, {} as Record<string, number>);
  }
  if (rgb) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  }

  return hex;
};

function ColorTranslate() {
  const [color, setColor] = useState();
  const [rgbColor, setRgbColor] = useState();
  return (
    <div>
      <input
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setRgbColor(hex2rgb(color));
        }}
      >
        hex2rgb
      </button>
      <div>{JSON.stringify(rgbColor, null, 4)}</div>
    </div>
  );
}

export default ColorTranslate;
