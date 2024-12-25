interface Props {
  totalCount: number;
  completedCount: number;
}

const ProgressBar = ({ totalCount, completedCount }: Props) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-md">
      <div
        className="h-full bg-blue-800 rounded-md"
        style={{ width: `${(completedCount / totalCount) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
