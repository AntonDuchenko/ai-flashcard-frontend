import { BookOpenCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

export const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 bg-gradient-to-b from-blue-50 to-white/80 backdrop-blur-md shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BookOpenCheck className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-blue-800">FlashWords</h1>
        </Link>

        {/* <Button
          onClick={handleCreateDeck}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow"
        >
          Создать деку
        </Button> */}
      </div>
    </header>
  );
};
