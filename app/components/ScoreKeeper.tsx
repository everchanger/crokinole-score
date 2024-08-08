'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import type { Player } from '@/app/types';
import { GameContext, type GameContextType } from '../GameContext';
import GameSetup from './GameSetup';
import Counter from './Counter';

const scoring = [5, 10, 15, 20];

export default function ScoreKeeper() {
  const router = useRouter();
  const {
    colors,
    appState,
    setAppState,
    activeRound,
    setActiveRound,
    scoreMode,
    setScoreMode,
    targetScore,
    setTargetScore,
    players,
    setPlayers,
  } = useContext(GameContext) as GameContextType;

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

  const winner = roundWinner();

  return (
    <div className=''>
      {appState === 'setup' && (
        <GameSetup
          points={targetScore}
          players={players}
          scoreMode={scoreMode}
          colors={colors}
          onPointsChange={(points) => setTargetScore(points)}
          onAddPlayer={(player) => setPlayers([...players, player])}
          onRemovePlayer={(index) =>
            setPlayers(players.filter((_, i) => i !== index))
          }
          onUpdatePlayer={updatePlayer}
          onStartGame={() => {
            setPlayers(players.filter((player) => player.name !== ''));
            setAppState('scoring');
            router.push('/round/1');
          }}
          onChangeScoreMode={(mode) => setScoreMode(mode)}
        />
      )}
      {appState === 'scoring' && (
        <div className='glass p-2 shadow-md'>
          <h2>Round {activeRound}</h2>
          <table className='table'>
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
          <div className='mb-2 mt-6 flex justify-center'>
            <button className='btn btn-primary'>Round complete!</button>
          </div>
        </div>
      )}
    </div>
  );
}
