interface Props {
  totalCount: number;
  completedCount: number;
}

const ProgressBar = ({ totalCount, completedCount }: Props) => {
  return (
    <div
      className="w-full h-2 bg-gray-200 rounded-md
 fixed bottom-0 left-0 right-0 
    "
    >
      <div
        className="h-full bg-blue-500 rounded-md
        "
        style={{ width: `${(completedCount / totalCount) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
