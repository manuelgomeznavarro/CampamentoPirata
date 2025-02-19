<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\MonitorController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\GroupByMonitorController;
use App\Http\Controllers\ActivityTimelineController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::get('/admins', [AdminController::class, 'index']);
Route::post('/admins', [AdminController::class, 'store']);
Route::get('/admins/{id}', [AdminController::class, 'show']);
Route::put('/admins/{id}', [AdminController::class, 'update']);
Route::delete('/admins/{id}', [AdminController::class, 'destroy']);

Route::get('/tutors', [TutorController::class, 'index']);
Route::post('/tutors', [TutorController::class, 'store']);
Route::get('/tutors/{id}', [TutorController::class, 'show']);
Route::put('/tutors/{id}', [TutorController::class, 'update']);
Route::delete('/tutors/{id}', [TutorController::class, 'destroy']);

Route::get('/monitors', [MonitorController::class, 'index']);
Route::post('/monitors', [MonitorController::class, 'store']);
Route::get('/monitors/{id}', [MonitorController::class, 'show']);
Route::put('/monitors/{id}', [MonitorController::class, 'update']);
Route::delete('/monitors/{id}', [MonitorController::class, 'destroy']);

Route::get('/timelines', [TimelineController::class, 'index']);
Route::post('/timelines', [TimelineController::class, 'store']);
Route::get('/timelines/{id}', [TimelineController::class, 'show']);
Route::put('/timelines/{id}', [TimelineController::class, 'update']);
Route::delete('/timelines/{id}', [TimelineController::class, 'destroy']);

Route::get('/activities', [ActivityController::class, 'index']);
Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/activities/{id}', [ActivityController::class, 'show']);
Route::put('/activities/{id}', [ActivityController::class, 'update']);
Route::delete('/activities/{id}', [ActivityController::class, 'destroy']);

Route::get('/groups', [GroupController::class, 'index']);
Route::post('/groups', [GroupController::class, 'store']);
Route::get('/groups/{id}', [GroupController::class, 'show']);
Route::put('/groups/{id}', [GroupController::class, 'update']);
Route::delete('/groups/{id}', [GroupController::class, 'destroy']);

Route::get('/children', [ChildController::class, 'index']);
Route::post('/children', [ChildController::class, 'store']);
Route::get('/children/{id}', [ChildController::class, 'show']);
Route::put('/children/{id}', [ChildController::class, 'update']);
Route::delete('/children/{id}', [ChildController::class, 'destroy']);

Route::get('/inscriptions', [InscriptionController::class, 'index']);
Route::post('/inscriptions', [InscriptionController::class, 'store']);
Route::get('/inscriptions/{id}', [InscriptionController::class, 'show']);
Route::put('/inscriptions/{id}', [InscriptionController::class, 'update']);
Route::delete('/inscriptions/{id}', [InscriptionController::class, 'destroy']);

Route::get('/prices', [PriceController::class, 'index']);
Route::post('/prices', [PriceController::class, 'store']);
Route::get('/prices/{id}', [PriceController::class, 'show']);
Route::put('/prices/{id}', [PriceController::class, 'update']);
Route::delete('/prices/{id}', [PriceController::class, 'destroy']);

Route::get('/incidents', [IncidentController::class, 'index']);
Route::post('/incidents', [IncidentController::class, 'store']);
Route::get('/incidents/{id}', [IncidentController::class, 'show']);
Route::put('/incidents/{id}', [IncidentController::class, 'update']);
Route::delete('/incidents/{id}', [IncidentController::class, 'destroy']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::get('/payments/{id}', [PaymentController::class, 'show']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

Route::get('/attendances', [AttendanceController::class, 'index']);
Route::post('/attendances', [AttendanceController::class, 'store']);
Route::get('/attendances/{id}', [AttendanceController::class, 'show']);
Route::put('/attendances', [AttendanceController::class, 'update']);
Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy']);

Route::get('/activity_timeline', [ActivityTimelineController::class, 'index']);
Route::post('/activity_timeline', [ActivityTimelineController::class, 'store']);
Route::get('/activity_timeline/{id}', [ActivityTimelineController::class, 'show']);
Route::put('/activity_timeline/{id}', [ActivityTimelineController::class, 'update']);
Route::delete('/activity_timeline/{id}', [ActivityTimelineController::class, 'destroy']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/children/group_by_monitor', [GroupByMonitorController::class, 'children_data']);

Route::get('/activities_timeline_detailed/{id}', [ActivityTimelineController::class, 'show_details']);

Route::post('/attendances/by_timeline_and_date', [AttendanceController::class, 'show_attendaces_by_timeline_and_date']);

Route::get('/children/by_group/{group_id}', [ChildController::class, 'show_by_group']);

Route::get('monitors/monitor_by_group/{group_id}', [MonitorController::class, 'show_monitor_by_group']);

Route::get('/children/without_group',[ChildController::class, 'show_without_group']);