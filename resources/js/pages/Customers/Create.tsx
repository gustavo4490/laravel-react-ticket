import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Head, router, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { allowOnlyNumbers } from "@/utils/validaciones"
import { LoaderCircle } from "lucide-react"
import InputError from "@/components/input-error"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Clientes', href: '/customers' },
    { title: 'Crear cliente', href: '' },
]



function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('customers.store'))
    }

    const handelCancel = () => {
        if (data.name || data.address || data.email || data.phone) {
            if (!confirm('¿Estás seguro de que deseas salir?')) {
                return;
            }
        }
        router.visit(route('customers.index'))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear cliente" />

            <Card className="w-full max-w-[700px] mx-auto mt-[25px] shadow-none border-none">
                <CardHeader>
                    <CardTitle>Crear Cliente</CardTitle>
                    <CardDescription>
                        Completa los siguientes campos para registrar un nuevo cliente.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handelSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                autoFocus
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                maxLength={255}
                                type="text"
                                placeholder="Nombre completo"
                                className="w-full" />
                            <InputError message={errors.name} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                maxLength={255}
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="w-full" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', allowOnlyNumbers(e.target.value))}
                                disabled={processing}
                                maxLength={255}
                                type="tel"
                                placeholder="5512345678"
                                className="w-full" />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full md:col-span-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                disabled={processing}
                                type="text"
                                placeholder="Calle, número, colonia, ciudad..."
                                maxLength={255}
                                className="w-full"
                            />
                            <p className="text-xs text-gray-500 text-right">{data.address.length}/255</p>
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <CardFooter className="flex justify-end gap-4">
                            <Button
                                onClick={handelCancel}
                                variant="outline"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {processing ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>

            </Card>
        </AppLayout>
    )
}

export default Create
