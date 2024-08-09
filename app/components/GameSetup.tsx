'use client';

import Link from 'next/link';
import { useContext } from 'react';

import type { Player } from '@/app/types';
import PlayerInput from '@/app/components/PlayerInput';
import { GameContext, type GameContextType } from '@/app/GameContext';

export default function GameSetup({}: {}) {
  const {
    colors,
    scoreMode,
    setScoreMode,
    targetScore,
    setTargetScore,
    players,
    setPlayers,
  } = useContext(GameContext) as GameContextType;

  const canDelete = players.length > 2;

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const updatePlayer = (index: number, player: Player) => {
    const newPlayers = [...players];
    newPlayers[index] = player;
    setPlayers(newPlayers);
  };

  return (
    <div className='space-y-4'>
      <div className='glass space-x-4 p-4 shadow-md'>
        <p className='mb-2 font-semibold'>Scoring</p>
        <label className='label'>
          <span className='label-text'>Traditional</span>
          <input
            type='radio'
            value='traditional'
            className='radio-primary radio'
            checked={scoreMode === 'traditional'}
            onChange={() => setScoreMode('traditional')}
          />
        </label>
        <label className='label'>
          <span className='label-text'>Tournament</span>
          <input
            type='radio'
            value='tournament'
            className='radio-primary radio'
            checked={scoreMode === 'tournament'}
            onChange={() => setScoreMode('tournament')}
          />
        </label>
        <label className='label mb-4'>
          <span className='label-text'>Additive</span>
          <input
            type='radio'
            value='additive'
            className='radio-primary radio'
            checked={scoreMode === 'additive'}
            onChange={() => setScoreMode('additive')}
          />
        </label>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text'>
              How many points should the game have?
            </span>
          </div>
          <input
            type='number'
            className='input input-bordered w-20'
            value={targetScore}
            onChange={(e) => setTargetScore(parseInt(e.target.value))}
          />
        </label>
      </div>
      {players.map((player, index) => (
        <PlayerInput
          key={index}
          player={player}
          onChange={(player) => updatePlayer(index, player)}
          onDelete={() => {
            if (canDelete) setPlayers(players.filter((_, i) => i !== index));
          }}
          isAllowedToDelete={canDelete}
        />
      ))}
      <div className='glass flex justify-center space-x-3 p-4 shadow-md'>
        <button
          className='btn btn-outline btn-primary'
          onClick={() =>
            setPlayers([
              ...players,
              {
                name: '',
                color: getRandomColor(),
                scores: [[0, 0, 0, 0]],
              },
            ])
          }
        >
          Add player
        </button>
        <Link className='btn btn-primary' href='/round/1'>
          Start game!
        </Link>
      </div>
    </div>
  );
}
