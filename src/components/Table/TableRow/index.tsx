import { HealthStatus } from "../../../types";
import "./TableRow.css";

type TableRowProps = {
  healthStatuses: HealthStatus;
};

function TableRow(props: TableRowProps) {
  const { name, success, message, hostname, time } = props.healthStatuses;

  const letterColorClass = success ? "healthy" : "error"

  return (
    <tr className={`${letterColorClass}`}>
      <th>{name}</th>
      <td>{success ? "Healthy" : "Error"}</td>
      <td>{message}</td>
      <td>{hostname || '---'}</td>
      <td>{time || '---'}</td>
    </tr>
  );
}

export default TableRow;
