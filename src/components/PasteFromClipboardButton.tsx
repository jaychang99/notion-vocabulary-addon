interface Props {
  onPaste?: (value: string) => void;
}

const PasteFromClipboardButton = ({ onPaste }: Props) => {
  return (
    <button
      // a big round button
      className="w-[200px] h-[200px] bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full
      mx-auto mt-[200px]"
      onClick={() => {
        navigator?.clipboard
          ?.readText()
          .then((text) => {
            onPaste?.(text);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      Paste from clipboard
    </button>
  );
};

export default PasteFromClipboardButton;
