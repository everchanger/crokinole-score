import RoundScore from '@/app/components/RoundScore';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Hello, Round {params.id} page!</h1>
      <RoundScore />
    </div>
  );
}
