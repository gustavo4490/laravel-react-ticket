<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Support;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supports =  Support::paginate(10);

        return Inertia::render('Supports/Index', [
            'supports' => $supports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Supports/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:customers,email',
                'phone' => 'required|string|max:15',
                'speciality' => 'nullable|string|in:Software Support,Technical Support,Customer Service,Sales Support,Billing Support,Product Support,Technical Account Manager,Field Service Engineer,Help Desk Technician,IT Support Specialist,Network Support Technician',
            ]);

            Support::create($validated);

            return redirect()
                ->route('support.index')
                ->with('success', 'Support created successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed to create support.' . $e->getMessage()]);
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
    public function edit(Support $support)
    {
        return Inertia::render('Supports/Edit', [
            'support' => $support,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Support $support)
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:customers,email,' . $support->id,
                'phone' => 'required|string|max:15',
                'speciality' => 'nullable|string|in:Software Support,Technical Support,Customer Service,Sales Support,Billing Support,Product Support,Technical Account Manager,Field Service Engineer,Help Desk Technician,IT Support Specialist,Network Support Technician',
            ]);

            $support->update($validated);

            return redirect()
                ->route('support.index')
                ->with('success', 'Support updated successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed to update support.' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Support $support)
    {
        try {
            if (!$request->has('confirm') && $support->tickets()->count() > 0) {
                return
                    back()
                    ->with(['warning', "This support has {$support->tickets()->count()} ticket(s). associated. Please delete the tickets first."]);
            }

            $support->delete();

            return redirect()
                ->route('support.index')
                ->with('success', 'Support deleted successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed to delete support.' . $e->getMessage()]);
        }
    }
}
