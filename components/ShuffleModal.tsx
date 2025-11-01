'use client';

interface ShuffleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ShuffleModal({ isOpen, onClose, onConfirm }: ShuffleModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-sm border border-gray-700">
        <h2 className="text-white text-xl font-bold mb-4">Confirm Shuffle</h2>
        <p className="text-gray-300 mb-6 text-sm">
          Are you sure you want to shuffle all cards?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

