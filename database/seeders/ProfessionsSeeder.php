<?php

namespace Database\Seeders;

use App\Models\Profession;
use Illuminate\Database\Seeder;

class ProfessionsSeeder extends Seeder
{
    public function run(): void
    {
        Profession::factory()->count(20)->create();
    }
}
