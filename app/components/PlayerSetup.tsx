import type { Player, ScoreMode } from '@/app/types';
import PlayerInput from './PlayerInput';

export default function PlayerSetyp({
  players,
  colors,
  scoreMode,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  onChangeScoreMode,
  onStartGame,
}: {
  players: Player[];
  colors: string[];
  scoreMode: ScoreMode;
  onAddPlayer: (player: Player) => void;
  onRemovePlayer: (index: number) => void;
  onUpdatePlayer(index: number, player: Player): void;
  onChangeScoreMode: (mode: ScoreMode) => void;
  onStartGame: () => void;
}) {
  const canDelete = players.length > 2;

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className='space-y-4'>
      <div className='space-x-4 p-4 shadow-md'>
        <p className='mb-2 font-semibold'>Scoring</p>
        <label>
          <input
            type='radio'
            value='traditional'
            className='mr-1'
            checked={scoreMode === 'traditional'}
            onChange={() => onChangeScoreMode('traditional')}
          />
          Traditional
        </label>
        <label>
          <input
            type='radio'
            value='additive'
            className='mr-1'
            checked={scoreMode === 'additive'}
            onChange={() => onChangeScoreMode('additive')}
          />
          Additive
        </label>
      </div>
      {players.map((player, index) => (
        <PlayerInput
          key={index}
          player={player}
          onChange={(player) => onUpdatePlayer(index, player)}
          onDelete={() => {
            if (canDelete) onRemovePlayer(index);
          }}
          isAllowedToDelete={canDelete}
        />
      ))}
      <div className='flex justify-center space-x-3'>
        <button
          className='rounded-full border-2 border-blue-500 px-4 py-2 font-semibold uppercase text-blue-500 text-white shadow-md hover:border-blue-600 hover:text-blue-600 hover:shadow-sm'
          onClick={() => onAddPlayer({ name: '', color: getRandomColor() })}
        >
          Add player
        </button>
        <button
          className='rounded-full bg-blue-500 px-4 py-2 font-semibold uppercase text-white shadow-md hover:bg-blue-600 hover:shadow-sm'
          onClick={() => onStartGame()}
        >
          Start game!
        </button>
      </div>
    </div>
  );
}
