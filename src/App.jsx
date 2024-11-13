import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]); 
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
        const data = await response.json();
        const processedCardsData = data.message.map((imageUrl, index) => ({
          id: index,
          image: imageUrl,
        }));
        setCards(processedCardsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleCardClick = (cardId) => {
    if (clickedCards.has(cardId)) {
        setCurrentScore(0);
        setClickedCards(new Set());
    } else {
        setClickedCards(prevClickedCards => new Set(prevClickedCards).add(cardId));
        setCurrentScore(currentScore + 1);
        setBestScore(Math.max(currentScore + 1, bestScore));
    }
    shuffleCards();
  };

  const shuffleCards = () => {
    setCards(prevCards => {
        return [...prevCards].sort(() => Math.random() - 0.5);
    });
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <div className="scoreboard">
        <p>Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            image={card.image}
            onClick={() => handleCardClick(card.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;