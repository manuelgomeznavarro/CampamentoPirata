<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MonitorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group.
|
*/

//Route::apiResource('monitors', MonitorController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('monitors', MonitorController::class);
// Route::get('/monitors', [MonitorController::class, 'index']);
// If you need authentication, wrap it in middleware:
/*
Route::middleware('auth:api')->group(function () {
    Route::apiResource('monitors', MonitorController::class);
});
*/