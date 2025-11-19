const Buttons = ({ value, color }: { value: string; color: string }) => {
  const bg = `bg-${color}-600`;
  return (
    <button
      className={`py-2 px-4 rounded-xl tracking-wider ${bg} cursor-pointer hover:scale-95 transition`}
    >
      {value}
    </button>
  );
};

export default Buttons;
