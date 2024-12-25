export type Sentence = Word[];

interface Word {
  id: string;
  value: string;
  selected: boolean;
  isOpenForPhraseSelectionMode?: boolean;
  phraseId?: string; // when multiple words constitute a phrase. All words in a phrase will have the same phraseId.
}
