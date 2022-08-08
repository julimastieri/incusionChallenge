import { useEffect, useState } from "react";
import "./StatusPage.css";
import Table from "../../components/Table/index";
import { HealthStatus } from "../../types";
import { headers, apiNames } from "./constants";

function StatusPage() {
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>([]);
  const [intervalTime, setIntervalTime] = useState<number>(0);

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      const statusPromises: Promise<HealthStatus>[] = apiNames.map(
        (apiName, index) =>
          fetch(`https://api.factoryfour.com/${apiName}/health/status`)
            .then((res) => res.json())
            .then((data) => {
              return { ...data, name: apiNames[index] };
            })
            .catch(() => {
              return {
                success: false,
                message: `Unhealthy`,
                name: apiNames[index],
              };
            })
      );

      Promise.all(statusPromises).then((allResponses) =>
        setHealthStatuses(allResponses)
      );
      if (intervalTime === 0) setIntervalTime(15000);
    }, intervalTime);

    return () => clearInterval(fetchInterval);
  }, [intervalTime]);

  return (
    <div className="status-page">
      <Table
        title="Status Table"
        headers={headers}
        healthStatuses={healthStatuses}
      />
    </div>
  );
}

export default StatusPage;
