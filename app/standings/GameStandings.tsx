'use client';

import Link from 'next/link';
import { useContext } from 'react';

import type { Player } from '@/app/types';
import { GameContext, type GameContextType } from '@/app/GameContext';

export default function GameStandings() {
  const { players, scoreMode, scoring, setPlayers } = useContext(
    GameContext
  ) as GameContextType;

  const roundWinner = (round: number): { score: number; player?: Player } => {
    const scores = players.map((player) => {
      return player.scores[round - 1].reduce(
        (acc, score, index) => acc + score * scoring[index],
        0
      );
    });

    if (scoreMode === 'traditional') {
      if (scores[0] === scores[1]) {
        return {
          score: 0,
        };
      } else {
        const winnerIndex = scores[0] > scores[1] ? 0 : 1;
        const loserIndex = Math.abs(winnerIndex - 1);

        return {
          player: players[winnerIndex],
          score: scores[winnerIndex] - scores[loserIndex],
        };
      }
    } else {
      return { score: 0 };
    }
  };

  const winner = roundWinner(1);

  const roundsPlayed = players[0].scores.length;

  return (
    <div className='glass'>
      <table className='table'>
        <thead>
          <tr>
            <th>Round</th>
            <th>Winner</th>
            <th>Score</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: roundsPlayed }).map((_, index) => {
            const round = index + 1;
            const { player, score } = roundWinner(round);

            return (
              <tr key={round}>
                <td>{round}</td>
                <td>{player ? player.name : '-'}</td>
                <td>{player ? score : '-'}</td>
                <td>
                  {players
                    .map((player) => {
                      return player.scores[round - 1].reduce(
                        (acc, score, index) => acc + score * scoring[index],
                        0
                      );
                    })
                    .reduce((acc, score) => acc + score, 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
