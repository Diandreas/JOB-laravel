<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCvModelRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|max:45|unique:cv_models,name,' . $this->route('cvModel')->id,
            'description' => 'required|max:255',
            'price' => 'required|integer',
            'previewImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
