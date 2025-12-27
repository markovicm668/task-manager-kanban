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
        $request->validate([
            'name' => 'required|string'
        ]);

        $board = Board::create([
            'name' => $request->name
        ]);

        return response()->json($board, 201);
    }
}
