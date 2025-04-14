import { Button } from '@/components/ui/button';
import { DataTablePro } from '@/components/ui/dataTablePro';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, UserPlus } from 'lucide-react';

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
                    rowActions={(row) => (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => console.log('Ver', row)}>Ver</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log('Editar', row)}>Editar</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log('Eliminar', row)}>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                />
            </div>
        </AppLayout>
    );
}
