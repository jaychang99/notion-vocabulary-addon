export type Sentence = Word[];

interface Word {
  id: number;
  value: string;
  selected: boolean;
}
