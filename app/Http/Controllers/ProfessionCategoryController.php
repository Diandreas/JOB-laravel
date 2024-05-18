<?php

namespace App\Http\Controllers;
use App\Models\ProfessionCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionCategoryController extends Controller
{
    public function index()
    {
        $profession_categories = ProfessionCategory::with('children')->whereNull('parent_id')->get();

        return Inertia::render('ProfessionCategories/Index', ['profession_categories' => $profession_categories]);
    }

    public function create()
    {
        $parent_categories = ProfessionCategory::whereNull('parent_id')->get();

        return Inertia::render('ProfessionCategories/Create', ['parent_categories' => $parent_categories]);
    }

    public function store(Request $request)
    {
        $request->validate(ProfessionCategory::rules());

        ProfessionCategory::create($request->all());

        return redirect()->route('profession-categories.index');
    }

    public function edit(ProfessionCategory $profession_category)
    {
        $parent_categories = ProfessionCategory::whereNull('parent_id')->get();

        return Inertia::render('ProfessionCategories/Edit', ['profession_category' => $profession_category, 'parent_categories' => $parent_categories]);
    }

    public function update(Request $request, ProfessionCategory $profession_category)
    {
        $request->validate(ProfessionCategory::rules($profession_category->id));

        $profession_category->update($request->all());

        return redirect()->route('profession-categories.index');
    }

    public function destroy(ProfessionCategory $profession_category)
    {
        $profession_category->delete();

        return redirect()->route('profession-categories.index');
    }
}
