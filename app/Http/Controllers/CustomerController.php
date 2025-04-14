<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::paginate(10);

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(('Customers/Create'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        Customer::create($validated);

        return redirect()
            ->route('customers.index')
            ->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:customers,email,' . $customer->id,
                'phone' => 'required|string|max:15',
                'address' => 'nullable|string|max:255',
            ]);

            // Actualizar el cliente en la base de datos con los datos validados.
            $customer->update($validated);

            // Redirigir al usuario a la lista de clientes con un mensaje de éxito.
            return redirect()
                ->route('customers.index')
                ->with('success', 'Customer updated successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed to update customer.' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Customer $customer)
    {
        try {
            if (!$request->has('confirm') && $customer->tickets()->count() > 0) {
                return
                    back()
                    ->with(['warning', "This customer has {$customer->tickets()->count()} ticket(s). associated. Please delete the tickets first."]);
            }

            $customer->delete();

            return redirect()
                ->route('customers.index')
                ->with('success', 'Customer deleted successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed to delete customer.' . $e->getMessage()]);
        }
    }
}
