import { useState, useEffect } from "react";

interface Card {
  id: number;
  name: string;
  rate: number;
}

interface ClickProps {
  onButtonClick: () => void; // onButtonClickは関数
}

function CardApp({ onButtonClick }: ClickProps): JSX.Element {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCardCount, setVisibleCardCount] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("db.json");
      const jsonData = await res.json();
      setCardList(jsonData);
      setLoading(false);
    }

    fetchData().catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && cardList.length > 0) {
      resetCards();
    }
  }, [loading, cardList]);

  useEffect(() => {
    if (shuffledCards.length > 0 && visibleCardCount < 5) {
      const timer = setTimeout(() => {
        setVisibleCardCount((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visibleCardCount, shuffledCards]);

  useEffect(() => {
    if (visibleCardCount === 5) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);

      return () => clearTimeout(timer); // クリーンアップ
    } else {
      setShowButtons(false); // visibleCardCountが5でないときは非表示
    }
  }, [visibleCardCount]);

  const resetCards = () => {
    setShuffledCards(cardList.sort(() => 0.5 - Math.random()).slice(0, 5));
    setVisibleCardCount(0);
  };

  const renderCard = (card: Card, idx: number) => (
    <div key={card.id} className="flex-shrink-0 w-28 h-auto md:w-64 ">
      {idx < visibleCardCount ? (
        <img
          src={`./card-image/${card.name}`}
          className="w-full h-full object-cover"
          alt={card.name}
        />
      ) : (
        <div className="w-full h-full bg-gray-200"></div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="mt-32 text-center text-lg font-bold">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-9 my-10">
      <div className="flex space-x-4 sm:space-x-2">
        {shuffledCards.slice(0, 3).map((card, idx) => renderCard(card, idx))}
      </div>
      <div className="flex space-x-4 sm:space-x-2">
        {shuffledCards
          .slice(3, 5)
          .map((card, idx) => renderCard(card, idx + 3))}
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div
          className="transition-opacity duration-1000"
          style={{
            opacity: showButtons ? 1 : 0,
            visibility: showButtons ? "visible" : "hidden",
          }}
        >
          <button
            className="w-32 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-14"
            onClick={resetCards}
          >
            Try again!
          </button>
        </div>
        <div
          className="transition-opacity duration-1000"
          style={{
            opacity: showButtons ? 1 : 0,
            visibility: showButtons ? "visible" : "hidden",
          }}
        >
          <button
            className="w-32 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onButtonClick}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardApp;
