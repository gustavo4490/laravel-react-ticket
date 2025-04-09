import AppLayout from '@/layouts/app-layout';
import { CustomersProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/customers',
    },
];

export default function Index() {
    const { customers } = usePage<CustomersProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            {/* contenedor principal   */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ul>
                    {customers.data.map((customer) => (
                        <li key={customer.id} className="border-b border-gray-200 py-2">
                            {customer.name} - {customer.email} {customer.name}
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
