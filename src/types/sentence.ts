export type Sentence = Word[];

interface Word {
  id: string;
  value: string;
  selected: boolean;
}
