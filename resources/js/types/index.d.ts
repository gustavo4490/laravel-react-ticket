import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// intrfaces para el proyecto

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

// export interface CustomersProps {
//     customers: {
//         data: Customer[];
//         meta: {
//             current_page: number;
//             last_page: number;
//             total: number;
//         };
//     };
//     [key: string]: unknown;
// }

//para la paginacion

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface paginatedData<T> {
    data: T[];
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    links: PaginationLink[];
}

export interface PageProps {
    customers: paginatedData<Customer>;
    [key: string]: unknown;
}
