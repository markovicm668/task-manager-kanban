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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'board_id' => 'required|exists:boards,id',
            'status' => 'in:todo,doing,done'
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'board_id' => $validated['board_id'],
            'status' => $validated['status'] ?? 'todo',
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:todo,doing,done'
        ]);

        $task->update($validated);

        return response()->json($task);
    }


    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }

    // public function updateStatus(Request $request, Task $task)
    // {
    //     $validated = $request->validate([
    //         'status' => 'required|in:todo,doing,done'
    //     ]);

    //     $task->update($validated);

    //     return response()->json($task);
    // }
}
