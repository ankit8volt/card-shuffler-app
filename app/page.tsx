'use client';

import { useState, useEffect } from 'react';
import { Card as CardType, generateDeck, shuffleDeck } from '@/lib/cards';
import Card from '@/components/Card';

export default function Home() {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [openedCards, setOpenedCards] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Initialize session on mount
  useEffect(() => {
    // Check if there's an existing session
    const savedDeck = sessionStorage.getItem('cardShuffler_deck');
    const savedOpened = sessionStorage.getItem('cardShuffler_opened');
    const savedIndex = sessionStorage.getItem('cardShuffler_index');

    if (savedDeck && savedOpened !== null && savedIndex !== null) {
      // Restore session
      setDeck(JSON.parse(savedDeck));
      setOpenedCards(JSON.parse(savedOpened));
      setCurrentIndex(parseInt(savedIndex));
    } else {
      // Start new session - shuffle deck
      const newDeck = shuffleDeck(generateDeck());
      setDeck(newDeck);
      setOpenedCards([]);
      setCurrentIndex(-1);
      // Save to sessionStorage
      sessionStorage.setItem('cardShuffler_deck', JSON.stringify(newDeck));
      sessionStorage.setItem('cardShuffler_opened', JSON.stringify([]));
      sessionStorage.setItem('cardShuffler_index', '-1');
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (deck.length > 0 || openedCards.length > 0) {
      sessionStorage.setItem('cardShuffler_deck', JSON.stringify(deck));
      sessionStorage.setItem('cardShuffler_opened', JSON.stringify(openedCards));
      sessionStorage.setItem('cardShuffler_index', currentIndex.toString());
    }
  }, [deck, openedCards, currentIndex]);

  const handleNextCard = () => {
    if (deck.length > 0) {
      const nextCard = deck[0];
      const newDeck = deck.slice(1);
      const newOpenedCards = [...openedCards, nextCard];
      const newIndex = newOpenedCards.length - 1;

      setDeck(newDeck);
      setOpenedCards(newOpenedCards);
      setCurrentIndex(newIndex);
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    // Combine all cards
    const allCards = [...openedCards, ...deck];
    // Shuffle
    const shuffledDeck = shuffleDeck(allCards);
    // Reset
    setDeck(shuffledDeck);
    setOpenedCards([]);
    setCurrentIndex(-1);
  };

  const currentCard = currentIndex >= 0 && currentIndex < openedCards.length 
    ? openedCards[currentIndex] 
    : null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex p-8 gap-8">
        {/* Left side - Deck */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-white text-xl mb-4 font-semibold text-center">Deck</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative" style={{ height: '308px', width: '229px' }}>
              {deck.length > 0 ? (
                <>
                  {/* Stack of cards */}
                  {deck.slice(0, 5).map((card, index) => (
                    <div
                      key={card.id}
                      className="absolute"
                      style={{
                        left: `${index * 3}px`,
                        top: `${index * 3}px`,
                      }}
                    >
                      <Card card={card} isBack={true} size="large" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full h-full rounded-lg border-2 border-gray-600 border-dashed flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Empty</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-white mt-4 text-sm text-gray-400 text-center">
            {deck.length} cards remaining
          </p>
        </div>

        {/* Right side - Opened Card */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-white text-xl mb-4 font-semibold text-center">Opened Card</h2>
          <div className="flex-1 flex items-center justify-center">
            <div style={{ height: '308px', width: '220px' }}>
              {currentCard ? (
                <Card card={currentCard} size="large" />
              ) : (
                <div className="w-full h-full rounded-lg border-2 border-gray-700 border-dashed flex items-center justify-center">
                  <span className="text-gray-600 text-sm">No card opened</span>
                </div>
              )}
            </div>
          </div>
          {openedCards.length > 0 && (
            <p className="text-white mt-4 text-sm text-gray-400 text-center">
              Card {currentIndex + 1} of {openedCards.length}
            </p>
          )}
        </div>
      </div>

      {/* Bottom - Buttons */}
      <div className="p-8 border-t border-gray-800">
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePreviousCard}
            disabled={currentIndex <= 0}
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous Card
          </button>
          <button
            onClick={handleNextCard}
            disabled={deck.length === 0}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Card
          </button>
          <button
            onClick={handleShuffle}
            className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}

