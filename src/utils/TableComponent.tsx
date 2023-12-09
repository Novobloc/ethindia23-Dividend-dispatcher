import React from "react";
import CardMenu from "utils/card/CardMenu";
import Card from "utils/card";
import Progress from "utils/progress";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export default function ComplexTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("details.chainId", {
      id: "chainId",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Chain ID</p>,
      cell: (info: { getValue: () => string | number }) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
    }),
    columnHelper.accessor("details.direction", {
      id: "direction",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Direction</p>,
      cell: (info: { getValue: () => string | number }) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
    }),
    columnHelper.accessor("details.amount", {
      id: "amount",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Amount</p>,
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
    }),
    columnHelper.accessor("details.status", {
      id: "status",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>,
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | null
          | undefined;
      }) => (
        <div className="flex items-center">
          {info.getValue() === "completed" ? (
            <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
          ) : info.getValue() === "Disable" ? (
            <MdCancel className="text-red-500 me-1 dark:text-red-300" />
          ) : info.getValue() === "Error" ? (
            <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
        </div>
      )
    }),
    columnHelper.accessor("details.type", {
      id: "type",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Type</p>,
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
    })
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });
  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">Complex Table</div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header: any) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start">
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: "",
                          desc: ""
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row: any) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <td key={cell.id} className="min-w-[150px] border-white/0 py-3  pr-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
