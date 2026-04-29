<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('tasks:auto-complete')->everyMinute();