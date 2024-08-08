'use client';

import { useContext } from 'react';

import { GameContext, type GameContextType } from '@/app/GameContext';

export default function Counter({}: {}) {
  const { players } = useContext(GameContext) as GameContextType;

  return <p>TEST {players.length}</p>;
}
