<?php

namespace App\Http\Controllers;

use App\Models\Monitor;
use App\Models\User;
use App\Models\Timeline;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Time;

class MonitorController extends Controller
{

    public function index()
    {
        $monitors = Monitor::all();
        foreach ($monitors as $monitor) {
            $group = Group::where('monitor_id', $monitor->id)->first();
            if ($group) {
                $monitor->group = $group->name;
            }
        }
        return response()->json($monitors, 200);
    }

    public function store(Request $request)
    {
        try {
            $existingUser = User::where('email', $request->email)->first();

            if ($existingUser) {
                return response()->json([
                    'message' => 'Este email ya esta siendo usado',
                    'error' => 'Duplicate email'
                ], 422);
            }

            DB::beginTransaction();

            // Create the monitor
            $monitor = Monitor::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'dni' => $request->dni,
                'phone' => $request->phone,
                'phone2' => $request->phone2,
                'description' => $request->description,
                'admin_id' => $request->admin_id,
            ]);

            // Create the associated user
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'monitor',
                'role_id' => $monitor->id
            ]);

            $timeline = Timeline::create([
                'admin_id' => $request->admin_id
            ]);

            $group = Group::create([
                'name' => $request->name_group,
                'administrator_id' => $request->admin_id,
                'monitor_id' => $monitor->id,
                'timeline_id' => $timeline->id
            ]);

            DB::commit();

            // return response()->json([
            //     'message' => 'Monitor creado correctamente',
            //     'tutor' => $monitor
            // ], 201);

            $monitors = Monitor::all();
            return response()->json($monitors, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating monitor',
                'error' => $e->getMessage()
            ], 500);
        }

        // $monitors = Monitor::create($request->all());
        // return response()->json($monitors, 201);
    }


    public function show($IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        $group = Group::where('monitor_id', $IdMonitors)->first();
        $monitors->group = $group->name;
        return response()->json($monitors, 200);
    }


    public function update(Request $request, $IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        $group = Group::where('monitor_id', $IdMonitors)->first();
        $group->update([
            'name' => $request->name_group
        ]);
        $monitors->update($request->all());
        return response()->json($monitors, 200);
    }

    public function destroy($IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        $monitors->delete();
        return response()->json(['message' => 'Monitor eliminado correctamente'], 200);
    }

    public function show_monitor_by_group($group_id)
    {
        $monitors = Monitor::where('group_id', $group_id)->get();
        return response()->json($monitors, 200);
    }
}
