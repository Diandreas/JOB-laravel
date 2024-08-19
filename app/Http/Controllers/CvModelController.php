<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCvModelRequest;
use App\Http\Requests\UpdateCvModelRequest;
use App\Models\CvModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CvModelController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/CvModels/Index', [
            'cvModels' => CvModel::all(),
        ]);
    }
    public function userCvModels()
    {
        $user = auth()->user();
        $userCvModels = $user->cvModels;
        $availableCvModels = CvModel::whereNotIn('id', $userCvModels->pluck('id'))->get();

        return Inertia::render('CvInfos/CvModels/Index', [
            'userCvModels' => $userCvModels,
            'availableCvModels' => $availableCvModels,
        ]);
    }
    public function create()
    {
        return Inertia::render('admin/CvModels/Create');
    }

    public function store(StoreCvModelRequest $request)
    {
        $cvModel = new CvModel();
        $cvModel->name = $request->name;
        $cvModel->description = $request->description;
        $cvModel->price = $request->price;

        // Télécharger l'image de prévisualisation
        if ($request->hasFile('previewImage')) {
            $imagePath = $request->file('previewImage')->store('cvModel_previews', 'public');
            $cvModel->previewImagePath = $imagePath;
        }

        // Créer le fichier dans le dossier cvgallery
        $viewPath = 'CvGallery/' . $request->name . '.tsx';
        $viewContent = "import React from 'react';\n\nconst " . ucfirst($request->name) . " = () => {\n    return (\n        <div>\n            <!-- Contenu de la vue -->\n        </div>\n    );\n};\n\nexport default " . ucfirst($request->name) . ";";
        Storage::disk('public')->put($viewPath, $viewContent);
        $cvModel->viewPath = $viewPath;

        $cvModel->save();

        return redirect()->route('CvModels.index')->with('message', 'CV Model created successfully.');
    }

    public function show(CvModel $cvModel)
    {
        return Inertia::render('admin/CvModels/Show', [
            'cvModel' => $cvModel,
        ]);
    }

    public function edit(CvModel $cvModel)
    {
        return Inertia::render('admin/CvModels/Edit', [
            'cvModel' => $cvModel,
        ]);
    }

    public function update(UpdateCvModelRequest $request, CvModel $cvModel)
    {
        $cvModel->name = $request->name;
        $cvModel->description = $request->description;
        $cvModel->price = $request->price;

        // Télécharger l'image de prévisualisation si elle est fournie
        if ($request->hasFile('previewImage')) {
            // Supprimer l'ancienne image si elle existe
            if ($cvModel->previewImagePath) {
                Storage::disk('public')->delete($cvModel->previewImagePath);
            }
            $imagePath = $request->file('previewImage')->store('cvModel_previews', 'public');
            $cvModel->previewImagePath = $imagePath;
        }

        // Mettre à jour le chemin du fichier dans le dossier cvgallery
        $viewPath = 'cvgallery/' . $request->name . '.tsx';
        Storage::disk('public')->put($viewPath, '');
        $cvModel->viewPath = $viewPath;

        $cvModel->save();

        return response()->json(['message' => 'CV Model updated successfully']);
    }

    public function destroy(CvModel $cvModel)
    {
        // Supprimer l'image de prévisualisation
        if ($cvModel->previewImagePath) {
            Storage::disk('public')->delete($cvModel->previewImagePath);
        }

        // Supprimer le fichier dans le dossier cvgallery
        if ($cvModel->viewPath) {
            Storage::disk('public')->delete($cvModel->viewPath);
        }

        $cvModel->delete();

        return response()->json(['message' => 'CV Model deleted successfully']);
    }
    public function selectActiveModel(Request $request)
    {
        $user = auth()->user();
        $user->selected_cv_model_id = $request->cv_model_id;
        $user->save();

        return response()->json(['message' => 'Active CV model updated successfully']);
    }

    public function addCvModel(Request $request)
    {
        $user = auth()->user();
        $user->cvModels()->attach($request->cv_model_id);

        return response()->json(['message' => 'CV model added successfully']);
    }

}
