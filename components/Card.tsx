import { Card as CardType, getCardColor, getSuitSymbol, Rank } from '@/lib/cards';

interface CardProps {
  card: CardType;
  isBack?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: { width: 150, height: 210, cornerSize: 'text-base', pipSize: 'text-2xl' },
  medium: { width: 180, height: 252, cornerSize: 'text-lg', pipSize: 'text-3xl' },
  large: { width: 220, height: 308, cornerSize: 'text-xl', pipSize: 'text-4xl' },
};

// Traditional playing card pip layouts
function getPipLayout(rank: Rank): Array<{ row: number; col: number }> {
  const layouts: Record<Rank, Array<{ row: number; col: number }>> = {
    'A': [{ row: 1, col: 1 }], // Center only
    
    '2': [
      { row: 0, col: 1 },
      { row: 2, col: 1 }
    ],
    
    '3': [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 }
    ],
    
    '4': [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 }
    ],
    
    '5': [
      { row: 0, col: 0 }, // top-left
      { row: 0, col: 2 }, // top-right
      { row: 1, col: 1 }, // center
      { row: 2, col: 0 }, // bottom-left
      { row: 2, col: 2 }  // bottom-right
    ],
    
    '6': [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 }
    ],
    
    '7': [
      { row: 0, col: 1 }, // top-center
      { row: 1, col: 0 }, // upper-mid-left
      { row: 1, col: 2 }, // upper-mid-right
      { row: 2, col: 1 }, // center
      { row: 3, col: 0 }, // lower-mid-left
      { row: 3, col: 2 }, // lower-mid-right
      { row: 4, col: 1 }  // bottom-center
    ],
    
    '8': [
      { row: 0, col: 0 }, // top-left
      { row: 0, col: 2 }, // top-right
      { row: 1, col: 0 }, // upper-mid-left
      { row: 1, col: 2 }, // upper-mid-right
      { row: 2, col: 0 }, // lower-mid-left
      { row: 2, col: 2 }, // lower-mid-right
      { row: 3, col: 0 }, // bottom-left
      { row: 3, col: 2 }  // bottom-right
    ],
    
    '9': [
      { row: 0, col: 0 }, // top-left
      { row: 0, col: 1 }, // top-center
      { row: 0, col: 2 }, // top-right
      { row: 1, col: 0 }, // upper-mid-left
      { row: 1, col: 2 }, // upper-mid-right
      { row: 2, col: 0 }, // lower-mid-left
      { row: 2, col: 2 }, // lower-mid-right
      { row: 3, col: 0 }, // bottom-left
      { row: 3, col: 2 }  // bottom-right
    ],
    
    '10': [
      { row: 0, col: 0 }, // top-left
      { row: 0, col: 2 }, // top-right
      { row: 1, col: 0 }, // upper-mid-left
      { row: 1, col: 1 }, // upper-mid-center
      { row: 1, col: 2 }, // upper-mid-right
      { row: 2, col: 0 }, // lower-mid-left
      { row: 2, col: 1 }, // lower-mid-center
      { row: 2, col: 2 }, // lower-mid-right
      { row: 3, col: 0 }, // bottom-left
      { row: 3, col: 2 }  // bottom-right
    ],
    
    'J': [],
    'Q': [],
    'K': []
  };
  
  return layouts[rank] || [];
}

export default function Card({ card, isBack = false, size = 'medium' }: CardProps) {
  if (!card || !card.suit || !card.rank) {
    return (
      <div
        className="bg-gray-200 rounded-lg border-2 border-gray-400 flex items-center justify-center shadow-lg w-full h-full"
      >
        <span className="text-gray-500 text-xs sm:text-sm">Invalid Card</span>
      </div>
    );
  }

  const { cornerSize, pipSize } = sizeMap[size];
  const color = getCardColor(card.suit);
  const symbol = getSuitSymbol(card.suit);
  const isFaceCard = card.rank === 'J' || card.rank === 'Q' || card.rank === 'K';
  const isAce = card.rank === 'A';
  const pipLayout = getPipLayout(card.rank);

  // Use aspect ratio and responsive sizing
  const cardAspectRatio = 220 / 308; // width/height ratio

  if (isBack) {
    return (
      <div
        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-blue-400 flex items-center justify-center shadow-lg w-full h-full"
        style={{ aspectRatio: cardAspectRatio }}
      >
        <div className="text-white font-bold" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>♠</div>
      </div>
    );
  }

  // Calculate sizes based on viewport - use CSS calc for responsiveness
  const baseSize = 220; // base card width for desktop
  const cornerHeightPercent = 15; // percentage of card width
  const pipAreaHeightPercent = 100 - (cornerHeightPercent * 2);

  return (
    <div
      className="bg-white rounded-lg border border-gray-400 shadow-lg relative overflow-hidden w-full h-full"
      style={{ 
        borderRadius: '8px'
      }}
    >
      {/* Top-left corner */}
      <div 
        className="absolute font-bold flex flex-col items-start leading-tight"
        style={{ 
          color, 
          top: 'clamp(4px, 1.5vw, 8px)',
          left: 'clamp(4px, 1.5vw, 8px)',
          fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
          lineHeight: 1
        }}
      >
        <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>{card.rank}</div>
        <div style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)', marginTop: '2px' }}>{symbol}</div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div 
        className="absolute font-bold flex flex-col items-end leading-tight"
        style={{ 
          color, 
          bottom: 'clamp(4px, 1.5vw, 8px)',
          right: 'clamp(4px, 1.5vw, 8px)',
          fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
          lineHeight: 1,
          transform: 'rotate(180deg)'
        }}
      >
        <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>{card.rank}</div>
        <div style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)', marginTop: '2px' }}>{symbol}</div>
      </div>

      {/* Center area for pips */}
      <div 
        className="absolute"
        style={{
          top: '15%',
          left: '0',
          right: '0',
          bottom: '15%'
        }}
      >
        {isFaceCard ? (
          // Face cards
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <span 
                className="font-bold"
                style={{ 
                  color, 
                  fontSize: 'clamp(3rem, 12vw, 5rem)',
                  lineHeight: 1
                }}
              >
                {card.rank}
              </span>
              <span 
                style={{ 
                  color, 
                  fontSize: 'clamp(1.25rem, 5vw, 2rem)',
                  marginTop: 'clamp(4px, 1.5vw, 8px)'
                }}
              >
                {symbol}
              </span>
            </div>
          </div>
        ) : isAce ? (
          // Ace - large center symbol
          <div className="flex items-center justify-center h-full">
            <span 
              style={{ 
                color, 
                fontSize: 'clamp(3rem, 15vw, 6rem)',
                lineHeight: 1
              }}
            >
              {symbol}
            </span>
          </div>
        ) : (
          // Numbered cards with pips - absolute positioning
          <div className="relative h-full w-full" style={{ padding: '12% 12%' }}>
            {pipLayout.map((pip, index) => {
              // Column positions: 0 = left (30%), 1 = center (50%), 2 = right (70%)
              const colPercent = pip.col === 0 ? 30 : pip.col === 1 ? 50 : 70;
              
              // Row positions: evenly spaced for all ranks
              let rowPercent;
              if (pip.row === 0) {
                rowPercent = 22; // top row
              } else if (pip.row === 1) {
                rowPercent = 36; // upper-middle row
              } else if (pip.row === 2) {
                rowPercent = 50; // center row
              } else if (pip.row === 3) {
                rowPercent = 64; // lower-middle row
              } else {
                rowPercent = 78; // bottom row (for rank 7 and 8-10)
              }
              
              return (
                <span
                  key={index}
                  className="absolute"
                  style={{
                    color,
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    left: `${colPercent}%`,
                    top: `${rowPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    lineHeight: 1
                  }}
                >
                  {symbol}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
