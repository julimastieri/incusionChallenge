import { HealthStatus } from "../../types";
import "./Table.css";
import TableRow from "./TableRow/index";

type TableProps = {
  title:string;
  headers: string[];
  healthStatuses: HealthStatus[];
};

function Table(props: TableProps) {
  const { title, headers, healthStatuses } = props;

  return (
    <table className="table">
      <caption>{title}</caption>
      <thead>
        <tr>
          {headers.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {healthStatuses.map((item) => (
          <TableRow
            key={item.name}
            healthStatuses={item}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
