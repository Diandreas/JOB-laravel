<?php

namespace Database\Seeders;

use App\Models\ProfessionCategory;
use Illuminate\Database\Seeder;

class ProfessionCategorySeeder extends Seeder
{
    public function run()
    {
        ProfessionCategory::factory()->count(5)->create();
    }
}
