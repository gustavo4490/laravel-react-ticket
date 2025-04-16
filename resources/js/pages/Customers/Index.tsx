import { Button } from '@/components/ui/button';
import { DataTablePro } from '@/components/ui/dataTablePro';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { AlertDialogCustommer } from './delete/AlertDialogCustommer';
import {SheetDemo} from './edit/sheetEdit'

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
    const { customers } = usePage<PageProps>().props;

    const handelPageChange = (url: string | null) => {
        if (url) {
            router.get(url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            {/* contenedor principal   */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1>Clientes</h1>

                    <Link href='customers/create'>
                        <Button className='cursor-pointer' >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Crear cliente
                        </Button>
                    </Link>
                </div>
                <DataTablePro
                    columns={columns}
                    data={customers.data}
                    pagination={{
                        from: customers.from,
                        to: customers.to,
                        total: customers.total,
                        links: customers.links,
                        onPageChange: handelPageChange,
                    }}
                    filterColumn="name"
                    filterPlaceholder="Buscar por nombre"
                    rowActions={() => (
                            <>
                            {/* <EditDialog /> */}
                            <SheetDemo/>
                            <AlertDialogCustommer /> 
                            </>
                        
                    )}
                />
            </div>
        </AppLayout>
    );
}
