import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "type", headerName: "Type", width: 100 },
  {
    field: "table",
    headerName: "Table Number",
    type: "number",
    width: 130,
  },
  { field: "date", headerName: "Date", width: 200 },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 90,
  },
];

interface RowsType {
  id: string;
  type: string;
  table: number;
  date: Date;
  total: number;
}

export default function Table({ rows }: { rows: RowsType[] }) {
  return (
    <>
      <div style={{ height: 400, width: "100%", border: "none" }}>
        <DataGrid
          className="border-none"
          rows={rows.map((row) => ({
            ...row,
            date: format(new Date(row.date), "dd/MM/yyyy"),
            total: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(row.total),
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
