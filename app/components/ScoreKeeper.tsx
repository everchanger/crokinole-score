'use client';

import { useState } from 'react';
import type { Player, ScoreMode } from '@/app/types';
import PlayerSetup from './PlayerSetup';

type AppState = 'setup' | 'scoring';

const colors = ['#004e89', '#fe4a49', '#c8e087', '#fed766', '#2ab7ca'];

export default function ScoreKeeper() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [scoreMode, setScoreMode] = useState<ScoreMode>('traditional');
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Player 1', color: colors[0] },
    { name: 'Player 2', color: colors[1] },
  ]);

  const updatePlayer = (index: number, player: Player) => {
    const newPlayers = [...players];
    newPlayers[index] = player;
    setPlayers(newPlayers);
  };

  return (
    <div className=''>
      {appState === 'setup' && (
        <PlayerSetup
          players={players}
          scoreMode={scoreMode}
          colors={colors}
          onAddPlayer={(player) => setPlayers([...players, player])}
          onRemovePlayer={(index) =>
            setPlayers(players.filter((_, i) => i !== index))
          }
          onUpdatePlayer={updatePlayer}
          onStartGame={() => setAppState('scoring')}
          onChangeScoreMode={(mode) => setScoreMode(mode)}
        />
      )}
      {appState === 'scoring' && <div>SCORING!</div>}
    </div>
  );
}
