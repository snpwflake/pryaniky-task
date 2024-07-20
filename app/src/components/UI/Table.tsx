import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useMemo } from "react";
import { Row, Column } from "../../models/table";
import { UserDocsContext } from "../Logic/UserDocsLogic";
import LoadingContainer from "../Logic/LoadingContainer";

interface Props {
  columns: Column[];
}

export default function BasicTable({ columns }: Props) {
  const COLUMNS = useMemo(() => columns, [columns]);
  const { value: data, error, loading } = useContext(UserDocsContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={COLUMNS.length}>
                <LoadingContainer loading={loading} />
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ textAlign: "center", height: "100px" }}
                colSpan={columns.length}
                align="center"
              >
                {error}
              </TableCell>
            </TableRow>
          )}
          {data.length === 0 && !error && !loading && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ textAlign: "center", height: "100px" }}
                colSpan={columns.length}
                align="center"
              >
                Нет данных
              </TableCell>
            </TableRow>
          )}
          {data.map((row: Row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.format
                    ? column.format(row[column.id], row)
                    : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
