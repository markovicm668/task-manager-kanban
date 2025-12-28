<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'board_id' => 'required|exists:boards,id'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'board_id' => $request->board_id
        ]);

        return response()->json($task, 201);
    }
}
