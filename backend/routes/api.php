<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from API'
    ]);
});

// Public routes
Route::get('/boards', [BoardController::class, 'index']);
Route::get('/boards/{id}', [BoardController::class, 'show']);
Route::get('/boards/{id}/tasks', [BoardController::class, 'tasks']);

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/boards', [BoardController::class, 'store']);
    Route::apiResource('tasks', TaskController::class)->except(['index', 'show']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
