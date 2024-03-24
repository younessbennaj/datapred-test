import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

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

  const { data: runs, doFetch: fetchRuns } = useFetch(`/flows/1/runs`);

  const { data: outputs, doFetch: fetchOutputs } = useFetch();

  const { data: trends, doFetch: fetchTrends } = useFetch();

  useEffect(() => {
    fetchFlow();
  }, [fetchFlow]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div>
      <h1>Dashboard</h1>
      <div>current flow: {flow?.flow_name}</div>
      <form onSubmit={handleSubmit}>
        <input
          min="2021-01-01"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProductionDate(e.target.value);
          }}
          type="date"
          name="production_date"
          id="production_date"
          value={productionDate}
        />
        <button type="submit">Submit</button>
      </form>

      {runs &&
        runs.results
          .filter((run: Run) => run.complete)
          .map((run: Run) => (
            <div key={run.id}>
              <div>Run ready</div>
              <button onClick={() => handleRunClick(run.id)}>
                Get Run Outputs
              </button>
            </div>
          ))}

      <div>
        <div>Select an output type</div>
        {outputs &&
          outputs.results.map(
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
      {trends &&
        trends.results.map((trend: Trend) => {
          return (
            <div key={trend.id}>
              <div>Horizon: {trend.horizon}</div>
              <div>Horizon Date: {trend.horizon_date}</div>
              <div>Horizon Frequency: {trend.horizon_frequency}</div>
              <div>Horizon Name: {trend.horizon_name}</div>
              <div>Output: {trend.output}</div>
              <div>Output Type: {trend.output_type}</div>
              <div>Trend: {trend.trend}</div>
            </div>
          );
        })}
    </div>
  );
};
