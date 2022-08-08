import { HealthStatus } from "../../../types";
import "./TableRow.css";

type TableRowProps = {
  healthStatuses: HealthStatus;
};

function TableRow(props: TableRowProps) {
  const { name, success, message, hostname, time } = props.healthStatuses;

  const letterColorClass = success ? "healthy" : "error";

  const parseTime = (timeMs: number): string => {
    const date = new Date(timeMs);
    return date.toString().split(" ")[4];
  };

  return (
    <tr className={`${letterColorClass}`}>
      <th>{name}</th>
      <td>{success ? "Healthy" : "Error"}</td>
      <td>{message}</td>
      <td>{hostname || "---"}</td>
      <td>{time ? parseTime(time) : "---"}</td>
    </tr>
  );
}

export default TableRow;
