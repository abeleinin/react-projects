export default function ColorCard({ color, hoverColor, onClick, flash }) {
  return (
    <div
      onClick={onClick}
      className={`${color} hover:opacity-60 h-48 w-48 rounded-lg`}
      /*{`colorCard ${color} ${flash ? "flash" : ""}`}*/
    ></div>
  );
}
