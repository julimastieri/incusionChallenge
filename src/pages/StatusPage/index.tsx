import { useEffect, useState } from "react";
import "./StatusPage.css";
import Table from "../../components/Table/index";
import { HealthStatus } from "../../types";
import { headers, apiNames } from "./constants";

function StatusPage() {
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>([]);
  const [intervalTime, setIntervalTime] = useState<number>(0);

  useEffect(() => {
    const statusPromises: Promise<HealthStatus>[] = apiNames.map(
      (apiName, index) =>
        fetch(`/${apiName}/health/status`)
          .then((res) =>
            res.status < 400
              ? res.json()
              : { success: false, message: `Unhealthy: ${res.status}` }
          )
          .then((data) => {
            return { ...data, name: apiNames[index] };
          })
    );

    const fetchInterval = setInterval(() => {
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
