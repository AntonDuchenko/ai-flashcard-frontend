import AvatarFallbackIcon from '@/shared/icons/AvatarFallback';
import { useLogout } from '@/shared/lib/hooks/useLoguot';
import { useProfile } from '@/shared/lib/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { BookOpenCheck, Flame } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { mutate } = useLogout();
  const { data: profile } = useProfile();

  const handleLogout = () => mutate();

  return (
    <motion.header
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full px-6 py-4 bg-gradient-to-b from-blue-50 to-white/80 backdrop-blur-md shadow-sm border-b border-blue-100"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BookOpenCheck className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-blue-800 hidden sm:block">FlashWords</h1>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-orange-500 flex gap-1 items-center bg-orange-200 rounded-2xl px-3 py-1 text-xl font-medium">
            <Flame />
            <div>{profile?.daysStreak}</div>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <AvatarFallbackIcon />
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow"
          >
            Logout
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
