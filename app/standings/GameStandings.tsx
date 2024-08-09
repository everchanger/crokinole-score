'use client';

import Link from 'next/link';
import { useContext } from 'react';

import type { Player } from '@/app/types';
import { GameContext, type GameContextType } from '@/app/GameContext';

export default function GameStandings() {
  const { players, scoreMode, scoring, setPlayers } = useContext(
    GameContext
  ) as GameContextType;

  const roundWinner = (round: number): { score: number; index?: number } => {
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
          index: winnerIndex,
          score: scores[winnerIndex] - scores[loserIndex],
        };
      }
    } else {
      return { score: 0 };
    }
  };

  const scores = Array(players.length).fill(0);
  const roundsPlayed = players[0].scores.length;
  const roundWinners = [];

  for (let round = 0; round < roundsPlayed; round++) {
    const winner = roundWinner(round + 1);
    roundWinners.push(winner);

    for (let i = 0; i < players.length; i++) {
      if (winner.index === i) {
        scores[i] = scores[i] + winner.score;
      }
    }
  }

  return (
    <div className='glass w-full space-y-6 p-2'>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={player.name}
                style={{ boxShadow: '-8px 0 ' + player.color }}
              >
                <td>{player.name}</td>
                <td>{scores[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Round</th>
              <th>Winner</th>
              <th>Score</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {roundWinners.map((_, roundIndex) => {
              const round = roundIndex + 1;
              const { index, score } = roundWinner(round);

              return (
                <tr key={round}>
                  <td>{round}</td>
                  <td>{index !== undefined ? players[index].name : '-'}</td>
                  <td>{index !== undefined ? score : '-'}</td>
                  <td>
                    <Link
                      className='btn btn-neutral btn-xs'
                      href={`/round/${round}`}
                    >
                      edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='mb-2 mt-6 flex justify-center'>
        <Link
          href={`/round/${roundsPlayed + 1}`}
          onClick={() => {
            setPlayers(
              players.map((player) => ({
                ...player,
                scores: [...player.scores, [0, 0, 0, 0]],
              }))
            );
          }}
          className='btn btn-primary'
        >
          Next round!
        </Link>
      </div>
    </div>
  );
}
