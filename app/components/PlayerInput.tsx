import type { Player } from '@/app/types';

export default function PlayerInput({
  player,
  onChange,
  onDelete,
  isAllowedToDelete,
}: {
  player: Player;
  onChange: (player: Player) => void;
  onDelete: () => void;
  isAllowedToDelete: boolean;
}) {
  return (
    <div
      className='glass flex items-center space-x-2 rounded-xl rounded-t-none border-0 border-t-4 border-solid p-4 shadow-md'
      style={{ borderColor: player.color }}
    >
      <input
        type='color'
        value={player.color}
        onChange={(e) => onChange({ color: e.target.value, name: player.name })}
        className='aspect-square bg-transparent'
      />
      <input
        className='input input-bordered w-full max-w-xs'
        value={player.name}
        onChange={(e) =>
          onChange({ color: player.color, name: e.target.value })
        }
      />
      <button
        onClick={onDelete}
        className='btn btn-circle btn-outline btn-error btn-sm'
        disabled={!isAllowedToDelete}
        title='Delete player'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}
