<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class AutoCompleteTasks extends Command
{
    protected $signature   = 'tasks:auto-complete';
    protected $description = 'Auto-completa tareas cuya fecha programada ya venció';

    public function handle(): void
    {
        $tasks = Task::overdue()->get();

        if ($tasks->isEmpty()) {
            $this->info('No hay tareas pendientes para auto-completar.');
            return;
        }

        foreach ($tasks as $task) {
            $task->update(['status' => 'completed']);
            $message = "Task \"{$task->title}\" has been auto-completed.";
            $this->info($message);
            Log::info($message);
        }
    }
}