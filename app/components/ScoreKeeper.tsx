'use client';

import { useState } from 'react';
import type { Player, ScoreMode } from '@/app/types';
import PlayerSetup from './PlayerSetup';
import Counter from './Counter';

type AppState = 'setup' | 'scoring';

const colors = ['#004e89', '#fe4a49', '#c8e087', '#fed766', '#2ab7ca'];
const scoring = [5, 10, 15, 20];

export default function ScoreKeeper() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [scoreMode, setScoreMode] = useState<ScoreMode>('traditional');
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Player 1', color: colors[0], scores: [[0, 0, 0, 0]] },
    { name: 'Player 2', color: colors[1], scores: [[0, 0, 0, 0]] },
  ]);
  const [activeRound, setActiveRound] = useState(1);

  const updatePlayer = (index: number, player: Player) => {
    const newPlayers = [...players];
    newPlayers[index] = player;
    setPlayers(newPlayers);
  };

  const updatePlayerScore = (
    index: number,
    scoreIndex: number,
    count: number
  ) => {
    const newPlayers = [...players];
    newPlayers[index].scores[activeRound - 1][scoreIndex] = count;
    setPlayers(newPlayers);
  };

  const roundWinner = (): { score: number; player?: Player } => {
    const scores = players.map((player) => {
      return player.scores[activeRound - 1].reduce(
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
        const scoreIndex = scores.indexOf(Math.max(...scores));
        return { player: players[scoreIndex], score: scores[scoreIndex] };
      }
    } else {
      return { score: 0 };
    }
  };

  const winner = roundWinner();

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
          onStartGame={() => {
            setPlayers(players.filter((player) => player.name !== ''));
            setAppState('scoring');
          }}
          onChangeScoreMode={(mode) => setScoreMode(mode)}
        />
      )}
      {appState === 'scoring' && (
        <div className='glass p-2 shadow-md'>
          <h2>Round {activeRound}</h2>
          <table className='table mb-8'>
            <thead>
              <tr>
                <th>Player</th>
                <th>5</th>
                <th>10</th>
                <th>15</th>
                <th>20</th>
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
                        count={player.scores[activeRound - 1][i] || 0}
                        onChange={(count) => updatePlayerScore(index, i, count)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Round winner:{' '}
            {winner.score && winner.player
              ? winner.player.name + ' score: ' + winner.score
              : 'Tie'}
          </p>
          <button className='btn btn-primary'>Round complete!</button>
        </div>
      )}
    </div>
  );
}
