export default function Counter({
  count,
  onChange,
  min = 0,
}: {
  count: number;
  onChange: (count: number) => void;
  min?: number;
}) {
  return (
    <div className='flex flex-col items-center'>
      <button className='btn btn-xs' onClick={() => onChange(count + 1)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-2 w-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M0 12L24 12M12 0l0 24'
          />
        </svg>
      </button>
      <span className='text-center'>{count}</span>
      <button
        className='btn btn-xs'
        disabled={count <= min}
        onClick={() => onChange(count - 1)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-2 w-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M0 12L24 12'
          />
        </svg>
      </button>
    </div>
  );
}
