<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        return response()->json(Board::all());
    }

    public function store(Request $request)
    {
        // Check if user is a Product Owner
        if ($request->user()->role !== 'product_owner') {
            return response()->json([
                'message' => 'Only Product Owners can create boards'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string'
        ]);

        $board = Board::create([
            'name' => $request->name
        ]);

        return response()->json($board, 201);
    }

    public function show($id)
    {
        $board = Board::findOrFail($id);
        return response()->json($board);
    }

    public function tasks($id)
    {
        $board = Board::findOrFail($id);
        return response()->json($board->tasks);
    }

    public function destroy(Request $request, $id)
    {
        // Check if user is a Product Owner
        if ($request->user()->role !== 'product_owner') {
            return response()->json([
                'message' => 'Only Product Owners can delete boards'
            ], 403);
        }

        $board = Board::findOrFail($id);
        $board->delete();

        return response()->json(null, 204);
    }
}
