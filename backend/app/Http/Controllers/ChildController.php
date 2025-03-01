<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ChildController extends Controller
{
    public function index()
    {
        $children = Child::all();
        return response()->json($children, 200);
    }

    public function store(Request $request)
    {
        Log::info('Child request:', $request->all()); // Log input
        Log::info('Child file:', $request->file()); // Log uploaded files
        // Log::info('----:', $request); // Log uploaded files

        try {
            $request->validate([
                'image' => 'required|image|max:5120', // 5MB max
                'json_data' => 'required|json'
            ]);

            // Parse the JSON data
            $jsonData = json_decode($request->json_data, true);

            $children = Child::create($jsonData);

            // Process image upload
            $file = $request->file('image');
            $originalName = $file->getClientOriginalName();
            $filename = Str::uuid() . '_' . $originalName;
            $path = 'children_images/' . $children->id . '/' . $filename;
            
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
            $children->url_pic = $url;
            $children->save();

            return response()->json($children, 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating tutor',
                'error' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_code' => $e->getCode(),
                'error_code' => $e->getTrace(),
            ], 500);
        }

    }

    public function show($idChildren)
    {
        $children = Child::findOrFail($idChildren);
        return response()->json($children, 200);
    }

    public function update(Request $request, $idChildren)
    {
        $children = Child::findOrFail($idChildren);
        $children->update($request->all());
        return response()->json($children, 200);
    }

    public function destroy($idChildren)
    {
        $children = Child::findOrFail($idChildren);
        $children->delete();
        return response()->json(['message' => 'Niño eliminado correctamente'], 200);
    }

    public function show_by_group($group_id)
    {
        $children = Child::where('group_id', $group_id)->get();
        return response()->json($children, 200);
    }

    public function childrenWithoutGroup()
    {
        $children = Child::whereNull('group_id')->get();
        // $children = Child::whereNull('group_id')->orWhere('group_id', '')->get();
        return response()->json($children);
    }
}
