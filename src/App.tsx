// import { useState } from "react";
import "./App.css";
import PackApp from "./components/PackApp.tsx";
import CardApp from "./components/CardApp.tsx";
import { useState } from "react";

function App() {
  const [showPackApp, setShowPackApp] = useState<boolean>(true);

  const handleButtonClick = () => {
    setShowPackApp((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="relative h-screen overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm transition-transform duration-300 transform sm:scale-110"
          style={{
            backgroundImage: `url(/pokemon-unpacking-app/product-image-1.png)`,
          }}
        ></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          {showPackApp ? (
            <PackApp onButtonClick={handleButtonClick} />
          ) : (
            <CardApp onButtonClick={handleButtonClick} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
