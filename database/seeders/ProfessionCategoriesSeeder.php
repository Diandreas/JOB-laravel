<?php

namespace Database\Seeders;

use App\Models\ProfessionCategory;
use Illuminate\Database\Seeder;

class ProfessionCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        ProfessionCategory::factory()->count(5)->create();
    }
}
