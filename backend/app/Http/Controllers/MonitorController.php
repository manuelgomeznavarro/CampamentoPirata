<?php

namespace App\Http\Controllers;

use App\Models\Monitor;
use App\Models\User;
use App\Models\Timeline;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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

        foreach ($monitors as $monitor) {
            $user = User::where('role', 'monitor')
                ->where('role_id', $monitor->id)
                ->first();

            $monitor->url_pic = $user->url_pic;
        }
        return response()->json($monitors, 200);
    }

    public function store(Request $request)
    {
        Log::info('Monitor request:', $request->all()); // Log input
        Log::info('Monitor file:', $request->file()); 
        try {
            $request->validate([
                'image' => 'required|image|max:5120', // 5MB max
                'json_data' => 'required|json'
            ]);

            // Parse the JSON data
            $jsonData = json_decode($request->json_data, true);

            // $existingUser = User::where('email', $jsonData->email)->first();

            // if ($existingUser) {
            //     return response()->json([
            //         'message' => 'Este email ya esta siendo usado',
            //         'error' => 'Duplicate email'
            //     ], 422);
            // }

            DB::beginTransaction();

            // Create the monitor
            $monitor = Monitor::create([
                'name' => $jsonData['name'],
                'lastname' => $jsonData['lastname'],
                'dni' => $jsonData['dni'],
                'phone' => $jsonData['phone'],
                'phone2' => $jsonData['phone2'],
                'description' => $jsonData['description'],
                'admin_id' => $jsonData['admin_id'],
            ]);

            // Create the associated user
            $user = User::create([
                'email' => $jsonData['email'],
                'password' => Hash::make($jsonData['password']),
                'role' => 'monitor',
                'role_id' => $monitor->id
            ]);

            $file = $request->file('image');

            $originalName = $file->getClientOriginalName();
            $filename = Str::uuid() . '_' . $originalName;
            $path = 'user_images/' . $user->id . '/' . $filename;
            
            // Upload to DigitalOcean Spaces
            $uploaded = Storage::disk('s3')->put($path, file_get_contents($file), 'public');
            
            if (!$uploaded) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image'
                ], 500);
            }
            
            // Generate the public URL
            $bucket = env('DO_SPACES_BUCKET');
            $region = env('DO_SPACES_REGION');
            $url = "https://{$bucket}.{$region}.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/{$path}";
            
            // Update the user's url_pic
            $user->url_pic = $url;
            $user->save();

            $timeline = Timeline::create([
                'admin_id' => $jsonData['admin_id']
            ]);

            $group = Group::create([
                'name' => $jsonData['name_group'],
                'administrator_id' => $jsonData['admin_id'],
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
                'error' => $e->getMessage(),
                'error2' => $e->getCode(),
                'error3' => $e->getFile(),
                'error4' => $e->getLine(),
                'error5' => $e->getPrevious(),
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
