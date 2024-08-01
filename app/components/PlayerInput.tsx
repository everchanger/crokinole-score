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
      className='flex items-center space-x-2 rounded-xl rounded-t-none border-t-4 p-4 shadow-md'
      style={{ borderColor: player.color }}
    >
      <input
        type='color'
        value={player.color}
        onChange={(e) => onChange({ color: e.target.value, name: player.name })}
        className='aspect-square bg-transparent'
      />
      <input
        className='rounded border border-solid border-gray-400 px-2 py-1'
        value={player.name}
        onChange={(e) =>
          onChange({ color: player.color, name: e.target.value })
        }
      />
      <button
        onClick={onDelete}
        className={
          'flex aspect-square h-8 w-8 items-center justify-center ' +
          (isAllowedToDelete
            ? 'rounded-full bg-red-500 p-2 text-white hover:bg-red-600'
            : 'cursor-not-allowed rounded-full bg-gray-300 p-2 text-gray-500')
        }
      >
        x
      </button>
    </div>
  );
}
