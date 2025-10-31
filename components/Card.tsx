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
        className="bg-gray-200 rounded-lg border-2 border-gray-400 flex items-center justify-center shadow-lg"
        style={{ width: sizeMap[size].width, height: sizeMap[size].height }}
      >
        <span className="text-gray-500">Invalid Card</span>
      </div>
    );
  }

  const { width, height, cornerSize, pipSize } = sizeMap[size];
  const color = getCardColor(card.suit);
  const symbol = getSuitSymbol(card.suit);
  const isFaceCard = card.rank === 'J' || card.rank === 'Q' || card.rank === 'K';
  const isAce = card.rank === 'A';
  const pipLayout = getPipLayout(card.rank);

  if (isBack) {
    return (
      <div
        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-blue-400 flex items-center justify-center shadow-lg"
        style={{ width, height }}
      >
        <div className="text-white font-bold" style={{ fontSize: `${Math.min(width, height) * 0.15}px` }}>♠</div>
      </div>
    );
  }

  const cornerHeight = width * 0.15;
  const pipAreaHeight = height - (cornerHeight * 2);
  const pipAreaTop = cornerHeight;

  return (
    <div
      className="bg-white rounded-lg border border-gray-400 shadow-lg relative overflow-hidden"
      style={{ 
        width, 
        height, 
        minWidth: width, 
        minHeight: height,
        borderRadius: '8px'
      }}
    >
      {/* Top-left corner */}
      <div 
        className="absolute font-bold flex flex-col items-start leading-tight"
        style={{ 
          color, 
          top: '8px',
          left: '8px',
          fontSize: `${width * 0.12}px`,
          lineHeight: 1
        }}
      >
        <div style={{ fontSize: `${width * 0.14}px` }}>{card.rank}</div>
        <div style={{ fontSize: `${width * 0.12}px`, marginTop: '2px' }}>{symbol}</div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div 
        className="absolute font-bold flex flex-col items-end leading-tight"
        style={{ 
          color, 
          bottom: '8px',
          right: '8px',
          fontSize: `${width * 0.12}px`,
          lineHeight: 1,
          transform: 'rotate(180deg)'
        }}
      >
        <div style={{ fontSize: `${width * 0.14}px` }}>{card.rank}</div>
        <div style={{ fontSize: `${width * 0.12}px`, marginTop: '2px' }}>{symbol}</div>
      </div>

      {/* Center area for pips */}
      <div 
        className="absolute"
        style={{
          top: `${pipAreaTop}px`,
          left: '0',
          right: '0',
          bottom: `${cornerHeight}px`
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
                  fontSize: `${width * 0.35}px`,
                  lineHeight: 1
                }}
              >
                {card.rank}
              </span>
              <span 
                style={{ 
                  color, 
                  fontSize: `${width * 0.15}px`,
                  marginTop: '8px'
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
                fontSize: `${Math.min(width, height) * 0.25}px`,
                lineHeight: 1
              }}
            >
              {symbol}
            </span>
          </div>
        ) : (
          // Numbered cards with pips - absolute positioning
          <div className="relative h-full w-full" style={{ padding: `${pipAreaHeight * 0.18}px ${width * 0.15}px` }}>
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
                    fontSize: `${width * 0.14}px`,
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
