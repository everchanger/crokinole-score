import RoundScore from './RoundScore';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <RoundScore round={parseInt(params.id)} />
    </div>
  );
}
