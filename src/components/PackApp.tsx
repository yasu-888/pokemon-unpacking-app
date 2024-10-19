interface ClickProps {
  onButtonClick: () => void; // onButtonClickは関数
}

function PackApp({ onButtonClick }: ClickProps) {
  const Click = () => {
    onButtonClick();
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-14 my-10">
      <img
        src="./product-image-1.png"
        className="transform transition-transform duration-300 hover:scale-110 cursor-pointer w-64 h-auto md:w-auto"
        onClick={Click}
      />
      <p className="text-3xl font-bold text-white animate-bounce">
        Tap to open!
      </p>
    </div>
  );
}

export default PackApp;
