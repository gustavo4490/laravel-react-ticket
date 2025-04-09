import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
  } from '@tanstack/react-table'
  import { useState } from 'react'
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  
  
  type DataTableProProps<TData> = {
    columns: ColumnDef<TData, unknown>[]
    data: TData[]
    filterColumn?: keyof TData
    filterPlaceholder?: string
    rowActions?: (row: TData) => React.ReactNode
  }
  
  export function DataTablePro<TData>({
    columns,
    data,
    filterColumn,
    filterPlaceholder = 'Buscar...',
    rowActions,
  }: DataTableProProps<TData>) {
    const [filterValue, setFilterValue] = useState('')
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        globalFilter: filterValue,
      },
      onGlobalFilterChange: setFilterValue,
    })
  
    return (
      <div className="space-y-4">
        {filterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
  
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
                {rowActions && <TableHead>Acciones</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {rowActions && (
                      <TableCell>{rowActions(row.original)}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + (rowActions ? 1 : 0)} className="text-center">
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
  
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    )
  }
  