<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Support;
use App\Models\Customer;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch tickets from the database and paginate them
        $tickets = Ticket::with(['customer', 'support'])
            ->latest()
            // ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Return the view with the tickets data
        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch customers and supports for the form
        $customers = Customer::select('id', 'name')->get();
        $supports = Support::select('id', 'name')->get();

        // Return the view with the customers and supports data
        return Inertia::render('Tickets/Create', [
            'customers' => $customers,
            'supports' => $supports,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validated = $request->validate([
                'customer_id' => 'required|exists:customers,id',
                'support_id' => 'nullable|exists:supports,id',
                'description' => 'required|string',
                'status' => 'required|string|in:open,closed,in-progress',
            ]);

            // Create a new ticket in the database with the validated data
            Ticket::create($validated);

            // Redirect to the tickets index with a success message
            return redirect()
                ->route('tickets.index')
                ->with('success', 'Ticket created successfully.');
        } catch (\Exception $e) {
            // Redirect back with an error message if something goes wrong
            return redirect()
                ->back()
                ->with(['error' => 'Failed to create ticket.' . $e->getMessage()]);
        }
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
    public function edit(Ticket $ticket)
    {
        // Fetch customers and supports for the form
        $customers = Customer::select('id', 'name')->get();
        $supports = Support::select('id', 'name')->get();

        // Return the view with the ticket, customers, and supports data
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket->load(['customer', 'support']),
            'customers' => $customers,
            'supports' => $supports,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        try {
            // Validate the request data
            $validated = $request->validate([
                'customer_id' => 'required|exists:customers,id',
                'support_id' => 'nullable|exists:supports,id',
                'description' => 'required|string',
                'status' => 'required|string|in:open,closed,in-progress',
            ]);

            // Update the ticket in the database with the validated data
            $ticket->update($validated);

            // Redirect to the tickets index with a success message
            return redirect()
                ->route('tickets.index')
                ->with('success', 'Ticket updated successfully.');
        } catch (\Exception $e) {
            // Redirect back with an error message if something goes wrong
            return redirect()
                ->back()
                ->with(['error' => 'Failed to update ticket.' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        try {
            // Delete the ticket from the database
            $ticket->delete();

            // Redirect to the tickets index with a success message
            return redirect()
                ->route('tickets.index')
                ->with('success', 'Ticket deleted successfully.');
        } catch (\Exception $e) {
            // Redirect back with an error message if something goes wrong
            return redirect()
                ->back()
                ->with(['error' => 'Failed to delete ticket.' . $e->getMessage()]);
        }
    }
}
