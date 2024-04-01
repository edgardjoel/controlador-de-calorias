type CalorieDisplayProps = {
  calories: number;
  text: string;
};
const CalorieDisplay = ({ calories, text }: CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold roundend-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl"> {calories}</span>
      {text}
    </p>
  );
};

export default CalorieDisplay;