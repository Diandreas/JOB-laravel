<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCvInfoRequest;
use App\Http\Requests\UpdateCvInfoRequest;
use App\Models\CvInfo;
use App\Models\Address;
use App\Models\Profession;
use App\Models\Competence;
use App\Models\Hobby;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CvInfosController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $cvInformation = [
            'hobbies' => $user->hobbies()->select('id', 'name')->take(3)->get()->toArray(),
            'competences' => $user->competences()->select('id', 'name')->take(3)->get()->toArray(),
            'experiences' => $user->experiences()->select('id', 'name', 'InstitutionName', 'date_start', 'date_end')->take(2)->get()->toArray(),
            'professions' => $user->profession()->select('id', 'name')->take(2)->get()->toArray(),
            'summaries' => $user->summaries()->select('id', 'description')->take(1)->get()->toArray(),
            'personalInformation' => [ // No relationship needed, just use the User model directly
                'id' => $user->id,
                'firstName' => $user->name, // Assuming the 'name' field in User is the full name
                // You can split the name into first and last if needed
            ], // Assuming you have personal information
        ];

        return Inertia::render('CvInfos/Index', [
            'cvInformation' => $cvInformation,
        ]);
    }




    public function show()
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $experiences = $user->experiences()->with('category')->get();

        $experiences = $experiences->map(function ($experience) {
            return [
                'id' => $experience->id,
                'name' => $experience->name,
                'description' => $experience->description,
                'date_start' => $experience->date_start,
                'date_end' => $experience->date_end,
                'output' => $experience->output,
                'experience_categories_id' => $experience->experience_categories_id,
                'comment' => $experience->comment,
                'InstitutionName' => $experience->InstitutionName,
                'attachment_id' => $experience->attachment_id,
                'category_name' => $experience->experience_category_id,
            ];
        })->toArray();


        $cvInformation = [
            'hobbies' => $user->hobbies()->select('id', 'name')->take(3)->get()->toArray(),
            'competences' => $user->competences()->select('id', 'name')->take(3)->get()->toArray(),
            'professions' => $user->profession ? [$user->profession] : [],
            'summaries' => $user->summaries()->select('id', 'description')->take(1)->get()->toArray(),
            'personalInformation' => [
                'id' => $user->id,
                'firstName' => $user->name,
            ],
            'experiences' => $experiences,
        ];
        Log::info($cvInformation); // Optional: Log to see if data is correct

        return Inertia::render('CvInfos/Show', [
            'cvInformation' => $cvInformation,
        ]);
    }




}
