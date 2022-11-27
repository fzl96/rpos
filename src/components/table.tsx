import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID Pesanan', width: 200 },
  { field: 'type', headerName: 'Tipe', width: 100 },
  {
    field: 'table',
    headerName: 'Nomor Meja',
    type: 'number',
    width: 100,
  },
  { field: 'date', headerName: 'Tanggal', width: 100 },
  { field: 'time', headerName: 'Jam', width: 70 },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    width: 150,
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
    <div style={{ height: 400, width: '100%', border: 'none' }}>
      <DataGrid
        className="border-none"
        rows={rows.map((row) => ({
          ...row,
          time: format(new Date(row.date), 'HH:mm'),
          date: format(new Date(row.date), 'dd/MM/yyyy'),
          total: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(row.total),
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
