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
import { Input } from '@/components/ui/input'
import { PaginationPro } from './paginationPro'

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

type DataTableProProps<TData> = {
    columns: ColumnDef<TData, unknown>[]
    data: TData[]
    filterColumn?: keyof TData
    filterPlaceholder?: string
    rowActions?: (row: TData) => React.ReactNode
    pagination?: {
        from: number
        to: number
        total: number
        links: PaginationLink[]
        onPageChange: (url: string | null) => void
    }
}

export function DataTablePro<TData>({
    columns,
    data,
    filterColumn,
    filterPlaceholder = 'Buscar...',
    rowActions,
    pagination,
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

            <div className="flex items-center justify-center space-x-2">
                {pagination &&
                    <PaginationPro
                        {...pagination}
                    />
                }
            </div>
        </div>
    )
}