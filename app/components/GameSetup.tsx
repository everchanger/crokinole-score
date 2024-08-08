import type { Player, ScoreMode } from '@/app/types';
import PlayerInput from './PlayerInput';

export default function GameSetup({
  points,
  players,
  colors,
  scoreMode,
  onPointsChange,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  onChangeScoreMode,
  onStartGame,
}: {
  points: number;
  players: Player[];
  colors: string[];
  scoreMode: ScoreMode;
  onPointsChange: (points: number) => void;
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
      <div className='glass space-x-4 p-4 shadow-md'>
        <p className='mb-2 font-semibold'>Scoring</p>
        <label className='label'>
          <span className='label-text'>Traditional</span>
          <input
            type='radio'
            value='traditional'
            className='radio-primary radio'
            checked={scoreMode === 'traditional'}
            onChange={() => onChangeScoreMode('traditional')}
          />
        </label>
        <label className='label'>
          <span className='label-text'>Tournament</span>
          <input
            type='radio'
            value='tournament'
            className='radio-primary radio'
            checked={scoreMode === 'tournament'}
            onChange={() => onChangeScoreMode('tournament')}
          />
        </label>
        <label className='label mb-4'>
          <span className='label-text'>Additive</span>
          <input
            type='radio'
            value='additive'
            className='radio-primary radio'
            checked={scoreMode === 'additive'}
            onChange={() => onChangeScoreMode('additive')}
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
            value={points}
            onChange={(e) => onPointsChange(parseInt(e.target.value))}
          />
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
      <div className='glass flex justify-center space-x-3 p-4 shadow-md'>
        <button
          className='btn btn-outline btn-primary'
          onClick={() =>
            onAddPlayer({
              name: '',
              color: getRandomColor(),
              scores: [[0, 0, 0, 0]],
            })
          }
        >
          Add player
        </button>
        <button className='btn btn-primary' onClick={() => onStartGame()}>
          Start game!
        </button>
      </div>
    </div>
  );
}
