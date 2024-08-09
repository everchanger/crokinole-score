'use client';

import { createContext, useState } from 'react';
import type { Player, ScoreMode } from '@/app/types';

export type GameContextType = {
  appState: AppState;
  activeRound: number;
  scoreMode: ScoreMode;
  targetScore: number;
  players: Player[];
  colors: string[];
  scoring: number[];
  setAppState: (state: AppState) => void;
  setActiveRound: (round: number) => void;
  setScoreMode: (mode: ScoreMode) => void;
  setTargetScore: (score: number) => void;
  setPlayers: (players: Player[]) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

type AppState = 'setup' | 'scoring';

const colors = ['#004e89', '#fe4a49', '#c8e087', '#fed766', '#2ab7ca'];
const scoring = [5, 10, 15, 20];

export function GameContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [appState, setAppState] = useState<AppState>('setup');
  const [scoreMode, setScoreMode] = useState<ScoreMode>('traditional');
  const [targetScore, setTargetScore] = useState(100);
  const [activeRound, setActiveRound] = useState(1);
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Player 1', color: colors[0], scores: [[0, 0, 0, 0]] },
    { name: 'Player 2', color: colors[1], scores: [[0, 0, 0, 0]] },
  ]);
  const [scores, setScores] = useState<number[][]>([[0, 0, 0, 0]]);

  return (
    <GameContext.Provider
      value={{
        appState,
        activeRound,
        scoreMode,
        targetScore,
        players,
        colors,
        scoring,
        setAppState,
        setActiveRound,
        setScoreMode,
        setTargetScore,
        setPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
