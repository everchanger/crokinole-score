export type Player = {
  name: string;
  color: string;
};

export default function PlayerInput({
  player,
  onChange,
}: {
  player: Player;
  onChange: (player: Player) => void;
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
    </div>
  );
}
