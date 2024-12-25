import { Sentence } from '@/types/sentence';
import { useReducer } from 'react';

interface State {
  sentence: Sentence;
  rawSentence: string;
}

type Action =
  | {
      type: WordActionTypes;
      wordId: string;
    }
  | {
      type: 'SET_SENTENCE';
      sentence: Sentence;
      rawSentence: string;
    }
  | {
      type: 'SET_PHRASE';
      word1: Sentence[number];
      word2: Sentence[number];
    }
  | {
      type: 'RESET_SENTENCE';
    }
  | {
      type: 'DESELECT_ALL_WORDS';
    };
type WordActionTypes =
  | 'MARK_WORD_AS_SELECTED'
  | 'MARK_WORD_AS_DESELECTED'
  | 'MARK_WORD_AS_OPEN_FOR_PHRASE_SELECTION'
  | 'MARK_WORD_AS_DEFAULT_STATE';

// Define the reducer function
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_SENTENCE':
      return {
        ...state,
        rawSentence: action.rawSentence,
        sentence: action.sentence,
      };
    case 'SET_PHRASE':
      const phraseId = new Date().getTime().toString(); // TODO: implement more reliable id generation

      const word1 = action.word1;
      const word2 = action.word2;

      const newSentence = state.sentence.map((word) => {
        if (word.id === word1.id) {
          return { ...word, phraseId, isOpenForPhraseSelectionMode: false };
        }

        if (word.id === word2.id) {
          return { ...word, phraseId, isOpenForPhraseSelectionMode: false };
        }

        return word;
      });

      return {
        ...state,
        sentence: newSentence,
      };
    case 'MARK_WORD_AS_SELECTED':
      return {
        ...state,
        sentence: state.sentence.map((word) =>
          word.id === action.wordId ? { ...word, selected: true } : word,
        ),
      };
    case 'MARK_WORD_AS_DESELECTED':
      return {
        ...state,
        sentence: state.sentence.map((word) =>
          word.id === action.wordId ? { ...word, selected: false } : word,
        ),
      };
    case 'MARK_WORD_AS_OPEN_FOR_PHRASE_SELECTION':
      return {
        ...state,
        sentence: state.sentence.map((word) =>
          word.id === action.wordId
            ? { ...word, isOpenForPhraseSelectionMode: true }
            : word,
        ),
      };
    case 'MARK_WORD_AS_DEFAULT_STATE':
      return {
        ...state,
        sentence: state.sentence.map((word) =>
          word.isOpenForPhraseSelectionMode
            ? { ...word, isOpenForPhraseSelectionMode: false, selected: false }
            : word,
        ),
      };
    case 'RESET_SENTENCE':
      return {
        ...state,
        rawSentence: '',
        sentence: [],
      };
    case 'DESELECT_ALL_WORDS':
      return {
        ...state,
        sentence: state.sentence.map((word) => ({
          ...word,
          selected: false,
          isOpenForPhraseSelectionMode: false,
          phraseId: undefined,
        })),
      };
    default:
      return state;
  }
};

export const useSetWordState = () => {
  return useReducer(reducer, { sentence: [], rawSentence: '' });
};
