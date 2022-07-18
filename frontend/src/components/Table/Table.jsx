import React from "react";
import { useTable, useExpanded } from "react-table";
import Pagination from "@mui/material/Pagination";
import LoadMask from "../LoadMask";
import "./table.css";

export default function Table({
  columns = [],
  data = [],
  loading = false,
  onPageChange = () => {},
  pageCount = 3,
  pageSize = 10,
  currentPage = 1,
  renderRowSubComponent,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
    },
    useExpanded
  );

  return (
    <LoadMask loading={loading}>
      <div className="table-scroll max-w-6xl">
        <table className="table-auto shadow w-full" {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="py-2 font-medium  text-left text-gray-900"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const rowIndex = row.index;
              const striped = rowIndex % 2 === 1;
              const rowProps = row.getRowProps();
              return (
                <React.Fragment key={rowProps.key}>
                  <tr className={`${striped && "bg-gray-100"}`} {...rowProps}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="py-2 font-light text-left"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 mx-4">
          <div className="flex -space-x-px">
            <Pagination
              page={currentPage}
              count={Math.ceil(pageCount / pageSize)}
              color="primary"
              onChange={(item, page) => onPageChange(page)}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </LoadMask>
  );
}
