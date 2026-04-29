<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)
            ->orderByRaw('scheduled_at IS NULL')
            ->orderBy('scheduled_at', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'scheduled_at' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id'      => $request->user()->id,
            'title'        => $request->title,
            'description'  => $request->description,
            'scheduled_at' => $request->scheduled_at,
            'status'       => 'pending',
        ]);

        return response()->json($task, 201);
    }

    public function show(Request $request, Task $task)
    {
        $this->authorizeTask($request->user(), $task);
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorizeTask($request->user(), $task);

        $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'description'  => 'nullable|string',
            'status'       => 'sometimes|in:pending,completed',
            'scheduled_at' => 'nullable|date',
        ]);

        $task->update($request->only('title', 'description', 'status', 'scheduled_at'));

        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorizeTask($request->user(), $task);
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada.']);
    }

    public function toggle(Request $request, Task $task)
    {
        $this->authorizeTask($request->user(), $task);

        $task->update([
            'status' => $task->status === 'pending' ? 'completed' : 'pending',
        ]);

        return response()->json($task);
    }

    private function authorizeTask($user, Task $task)
    {
        if ($task->user_id !== $user->id) {
            abort(403, 'No autorizado.');
        }
    }
}