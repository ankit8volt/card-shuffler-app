'use client';

import { useState, useRef, useEffect } from 'react';

interface ShuffleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PASSWORD = 'SHUFFLE';

export default function ShuffleModal({ isOpen, onClose, onConfirm }: ShuffleModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === PASSWORD) {
      setPassword('');
      setError('');
      onConfirm();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-sm border border-gray-700">
        <h2 className="text-white text-xl font-bold mb-4">Confirm Shuffle</h2>
        <p className="text-gray-300 mb-4 text-sm">
          Enter the password to shuffle the deck:
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 mb-2"
            autoComplete="off"
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Shuffle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

