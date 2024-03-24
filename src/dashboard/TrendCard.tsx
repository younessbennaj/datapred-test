export const TrendCard = ({
  isIncrease,
  horizonDate,
}: {
  isIncrease: boolean;
  horizonDate: string;
}) => {
  return (
    <div className="flex-1 flex-wrap p-6 border border-solid border-gray-600 rounded-lg flex gap-4 flex-row md:flex-col">
      <div className="flex flex-col text-gray-900 gap-1">
        <div className=" text-gray-900 font-semibold text-xs">
          Horizon Date:
        </div>
        <div className=" text-gray-600 text-2xl font-semibold">
          {horizonDate}
        </div>
      </div>
      <div className="flex flex-col text-gray-900 gap-1">
        <div className=" text-gray-900 font-semibold text-xs">Trend:</div>
        <span
          className={`text-2xl font-semibold ${
            isIncrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {isIncrease ? "increase" : "decrease"}
        </span>
      </div>
    </div>
  );
};
