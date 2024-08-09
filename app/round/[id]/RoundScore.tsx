'use client';

import Link from 'next/link';
import { useContext } from 'react';

import Counter from '@/app/components/Counter';
import { GameContext, type GameContextType } from '@/app/GameContext';

export default function RoundScore({ round }: { round: number }) {
  const { players, scoring, setPlayers } = useContext(
    GameContext
  ) as GameContextType;

  const updatePlayerScore = (
    index: number,
    scoreIndex: number,
    count: number
  ) => {
    const newPlayers = [...players];
    newPlayers[index].scores[round - 1][scoreIndex] = count;
    setPlayers(newPlayers);
  };

  return (
    <div className='glass p-2 shadow-md'>
      <h2 className='text-lg font-semibold'>Round {round}</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Player</th>
            <th className='pl-6'>5</th>
            <th className='pl-6'>10</th>
            <th className='pl-6'>15</th>
            <th className='pl-6'>20</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={player.name}
              style={{ boxShadow: '-8px 0 ' + player.color }}
            >
              <td>{player.name}</td>
              {scoring.map((score, i) => (
                <td key={i}>
                  <Counter
                    count={player.scores[round - 1][i] || 0}
                    onChange={(count) => updatePlayerScore(index, i, count)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mb-2 mt-6 flex justify-center'>
        <Link href='/standings' className='btn btn-primary'>
          Round complete!
        </Link>
      </div>
    </div>
  );
}
