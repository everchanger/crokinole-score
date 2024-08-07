export type Player = {
  name: string;
  color: string;
  scores: number[][];
};

export type ScoreMode = 'traditional' | 'additive';