import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Label } from "../common/Label";
import { Button } from "../common/Button";
import { TrendCard } from "./TrendCard";

type Run = {
  complete: boolean;
  flow: number;
  id: number;
  production_date: string;
};

type Trend = {
  horizon: number;
  horizon_date: string;
  horizon_frequency: string;
  horizon_name: string;
  id: number;
  output: number;
  output_type: string;
  trend: number;
};

export const Dashboard = () => {
  //Accepted date format is in ISO 8601 zero UTC offset
  const [productionDate, setProductionDate] = useState<string>("2021-01-01");

  const { data: flow, doFetch: fetchFlow } = useFetch("/flows/1");

  const {
    data: runs,
    doFetch: fetchRuns,
    error: runsError,
    reset: resetRuns,
    loading: runsLoading,
  } = useFetch(`/flows/1/runs`);

  const {
    data: outputs,
    doFetch: fetchOutputs,
    reset: resetOutputs,
  } = useFetch();

  const { data: trends, doFetch: fetchTrends, reset: resetTrends } = useFetch();

  useEffect(() => {
    fetchFlow();
  }, [fetchFlow]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetRuns();
    resetOutputs();
    resetTrends();
    //Accepted date format is in ISO 8601 zero UTC offset
    const isoString = new Date(productionDate).toISOString().slice(0, -5) + "Z";
    const params = { production_date: isoString };
    fetchRuns({ config: { params } });
  };

  const handleRunClick = (runId: number) => {
    fetchOutputs({ config: { url: `/flows/1/runs/${runId}/outputs` } });
  };

  const handleOutputClick = (
    outputId: number,
    outputType: string,
    runId: number
  ) => {
    if (outputType === "trends") {
      const url = `/flows/1/runs/${runId}/outputs/${outputId}/trends`;
      fetchTrends({ config: { url } });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>
      <div className="text-lg font-semibold">
        Current flow:{" "}
        <span className="px-2 py-1 border border-solid border-blue-800 bg-blue-100 text-blue-600 rounded-lg font-semibold">
          {flow?.flow_name}
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="production_date">Select a production date</Label>
            <input
              className="w-full md:w-[50%] border border-solid border-gray-300 rounded-md px-4 py-2"
              min="2021-01-01"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProductionDate(e.target.value);
              }}
              type="date"
              name="production_date"
              id="production_date"
              value={productionDate}
            />
          </div>
          <Button disabled={runsLoading} className="w-full md:w-[50%]">
            Submit
          </Button>
        </div>
      </form>

      {runsError && (
        <div className="text-red-600">No run available for this date</div>
      )}

      {runs && runs.results.filter((run: Run) => run.complete).length === 0 && (
        <div className="text-red-600">No complete run for this date</div>
      )}

      {runs &&
        runs.results
          .filter((run: Run) => run.complete)
          .map((run: Run) => (
            <div
              className="p-4 border border-gray-300 rounded-lg flex gap-4 items-center justify-between"
              key={run.id}
            >
              <div>
                You run with id n°{" "}
                <span className="text-blue-600 font-semibold">{run.id}</span> is
                ready
              </div>
              <button onClick={() => handleRunClick(run.id)}>
                Get Run Outputs
              </button>
            </div>
          ))}

      {outputs && (
        <div className="flex flex-col gap-4">
          <Label>Select an output type</Label>
          <div className="flex gap-2">
            {outputs.results.map(
              (output: { id: number; output_type: string; run: number }) => (
                <button
                  onClick={() =>
                    handleOutputClick(output.id, output.output_type, output.run)
                  }
                  key={output.id}
                >
                  {output.output_type}
                </button>
              )
            )}
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-10 flex-col md:flex-row">
        {trends &&
          trends.results.map((trend: Trend) => {
            const isIncrease = trend.trend > 0;
            return (
              <TrendCard
                key={trend.id}
                isIncrease={isIncrease}
                horizonDate={trend.horizon_date.slice(0, 10)}
              />
            );
          })}
      </div>
    </div>
  );
};
