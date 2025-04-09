import { DataTable } from '@/components/ui/dataTable';
import AppLayout from '@/layouts/app-layout';
import { CustomersProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/customers',
    },
];

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Teléfono',
    },
    {
        accessorKey: 'address',
        header: 'Dirección',
    },
];

export default function Index() {
    const { customers } = usePage<CustomersProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            {/* contenedor principal   */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={customers.data} />
            </div>
        </AppLayout>
    );
}
