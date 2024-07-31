'use client';

import { useState } from 'react';
import type { Player } from './PlayerInput';
import PlayerInput from './PlayerInput';

type ScoreMode = 'traditional' | 'additive';

export default function ScoreKeeper() {
  const [scoreMode, setScoreMode] = useState<ScoreMode>('traditional');
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Player 1', color: '#ff0000' },
    { name: 'Player 2', color: '#0000ff' },
  ]);

  const updatePlayer = (index: number, player: Player) => {
    const newPlayers = [...players];
    newPlayers[index] = player;
    setPlayers(newPlayers);
  };

  return (
    <div className='space-y-4'>
      {players.map((player, index) => (
        <PlayerInput
          key={index}
          onChange={(player) => updatePlayer(index, player)}
          player={player}
        />
      ))}
    </div>
  );
}
