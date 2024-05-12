<?php
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CvInfosController extends Controller
{
    public function create()
    {
        return Inertia::render('CvInfos/Create');
    }
}
