export default function ColorCard({ color, onClick, flash }) {
  return (
    <div
      onClick={onClick}
      // hover:opacity-60
      className={`${color} ${
        flash ? "brightness-125" : ""
      } h-48 w-48 rounded-lg`}
    ></div>
  );
}
