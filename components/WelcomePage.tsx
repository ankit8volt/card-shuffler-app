'use client';

interface WelcomePageProps {
  onEnter: () => void;
}

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 sm:space-y-8">
        {/* Main Title */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#fff8e1',
            textShadow: '2px 2px 8px rgba(255, 200, 50, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: 1.2
          }}
        >
          Welcome to the Late Diwali Party
        </h1>

        {/* Subtext */}
        <p 
          className="text-xl sm:text-2xl md:text-3xl opacity-90"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#fff8e1',
            textShadow: '1px 1px 4px rgba(255, 200, 50, 0.4), 0 0 15px rgba(255, 215, 0, 0.2)',
            letterSpacing: '0.03em'
          }}
        >
          Get ready to gamble
        </p>

        {/* Enter Button */}
        <div className="pt-8 sm:pt-12">
          <button
            onClick={onEnter}
            className="px-12 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg text-xl sm:text-2xl font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{
              fontFamily: "'Dancing Script', cursive",
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              boxShadow: '0 8px 16px rgba(255, 200, 50, 0.4)'
            }}
          >
            Let&apos;s go
          </button>
        </div>
      </div>

      {/* Footer text */}
      <div 
        className="fixed bottom-4 right-4 text-white text-2xl sm:text-3xl opacity-70"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontStyle: 'italic'
        }}
      >
        made with ❤️ and 🍺 last night in 90103
      </div>
    </div>
  );
}

