'use client';

import { useState, useEffect } from 'react';
import { Card as CardType, generateDeck, shuffleDeck } from '@/lib/cards';
import Card from '@/components/Card';
import ShuffleModal from '@/components/ShuffleModal';

export default function Home() {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [openedCards, setOpenedCards] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showShuffleModal, setShowShuffleModal] = useState(false);

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

  const handleShuffleClick = () => {
    setShowShuffleModal(true);
  };

  const handleShuffleConfirm = () => {
    // Combine all cards
    const allCards = [...openedCards, ...deck];
    // Shuffle
    const shuffledDeck = shuffleDeck(allCards);
    // Reset
    setDeck(shuffledDeck);
    setOpenedCards([]);
    setCurrentIndex(-1);
    setShowShuffleModal(false);
  };

  const currentCard = currentIndex >= 0 && currentIndex < openedCards.length 
    ? openedCards[currentIndex] 
    : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'transparent' }}>
      {/* Title Header */}
      <div className="text-center py-6 sm:py-8 px-4">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          style={{
            fontFamily: "'Dancing Script', 'Playfair Display', cursive",
            color: '#fff8e1',
            textShadow: '2px 2px 8px rgba(255, 200, 50, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: 1.2
          }}
        >
          <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 400 }}>Late</span>{' '}
          <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em' }}>Diwali</span>{' '}
          <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 400 }}>Party</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8">
        {/* Left side - Deck */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 font-semibold text-center">Deck</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-[229px]" style={{ height: 'clamp(200px, 40vw, 308px)', aspectRatio: '220/308' }}>
              {deck.length > 0 ? (
                <>
                  {/* Stack of cards */}
                  {deck.slice(0, 5).map((card, index) => (
                    <div
                      key={card.id}
                      className="absolute w-full h-full"
                      style={{
                        left: `${index * 2}px`,
                        top: `${index * 2}px`,
                      }}
                    >
                      <Card card={card} isBack={true} size="large" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full h-full rounded-lg border-2 border-gray-600 border-dashed flex items-center justify-center">
                  <span className="text-gray-600 text-xs sm:text-sm">Empty</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-white mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 text-center">
            {deck.length} cards remaining
          </p>
        </div>

        {/* Right side - Opened Card */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 font-semibold text-center">Opened Card</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[220px]" style={{ height: 'clamp(200px, 40vw, 308px)', aspectRatio: '220/308' }}>
              {currentCard ? (
                <Card card={currentCard} size="large" />
              ) : (
                <div className="w-full h-full rounded-lg border-2 border-gray-700 border-dashed flex items-center justify-center">
                  <span className="text-gray-600 text-xs sm:text-sm">No card opened</span>
                </div>
              )}
            </div>
          </div>
          {openedCards.length > 0 && (
            <p className="text-white mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 text-center">
              Card {currentIndex + 1} of {openedCards.length}
            </p>
          )}
        </div>
      </div>

      {/* Bottom - Buttons */}
      <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={handlePreviousCard}
            disabled={currentIndex <= 0}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous Card
          </button>
          <button
            onClick={handleNextCard}
            disabled={deck.length === 0}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Card
          </button>
          <button
            onClick={handleShuffleClick}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-colors"
          >
            Shuffle
          </button>
        </div>
      </div>

      {/* Shuffle Modal */}
      <ShuffleModal
        isOpen={showShuffleModal}
        onClose={() => setShowShuffleModal(false)}
        onConfirm={handleShuffleConfirm}
      />
    </div>
  );
}

