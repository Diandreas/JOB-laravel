<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfessionSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Forces armées' => [
                'description' => 'Professions militaires et de défense',
                'subcategories' => [
                    'Officiers des forces armées' => [],
                    'Sous-officiers des forces armées' => [],
                    'Autres membres des forces armées' => []
                ]
            ],
            'Direction et Cadres' => [
                'description' => 'Dirigeants, cadres supérieurs et membres de l\'exécutif',
                'subcategories' => [
                    'Dirigeants d\'entreprise' => [
                        'professions' => ['PDG', 'Directeur général', 'Gérant de société']
                    ],
                    'Cadres de direction' => [
                        'professions' => ['Directeur financier', 'Directeur commercial', 'DRH']
                    ],
                    'Législateurs et hauts fonctionnaires' => []
                ]
            ],
            'Professions intellectuelles' => [
                'description' => 'Professions intellectuelles et scientifiques',
                'subcategories' => [
                    'Sciences et ingénierie' => [
                        'professions' => ['Physicien', 'Chimiste', 'Biologiste', 'Ingénieur']
                    ],
                    'Santé' => [
                        'professions' => ['Médecin', 'Chirurgien', 'Pharmacien', 'Dentiste']
                    ],
                    'Enseignement' => [
                        'professions' => ['Professeur', 'Chercheur', 'Formateur']
                    ],
                    'Finance et gestion' => [],
                    'Technologies de l\'information' => [],
                    'Juridique et social' => [],
                    'Culture et création' => []
                ]
            ],
            'Professions intermédiaires' => [
                'description' => 'Techniciens et professions intermédiaires',
                'subcategories' => [
                    'Sciences et ingénierie' => [],
                    'Santé' => [],
                    'Affaires et administration' => [],
                    'Services juridiques et sociaux' => [],
                    'Culture et communication' => []
                ]
            ],
            'Employés administratifs' => [
                'description' => 'Employés de type administratif',
                'subcategories' => [
                    'Employés de bureau' => [],
                    'Service à la clientèle' => [],
                    'Comptabilité et finance' => [],
                    'Stockage et logistique' => []
                ]
            ],
            'Services et vente' => [
                'description' => 'Personnel des services et vendeurs',
                'subcategories' => [
                    'Services personnels' => [],
                    'Vente' => [],
                    'Soins aux personnes' => [],
                    'Protection et sécurité' => []
                ]
            ],
            'Agriculture et pêche' => [
                'description' => 'Agriculteurs et ouvriers qualifiés de l\'agriculture',
                'subcategories' => [
                    'Agriculture commerciale' => [],
                    'Élevage' => [],
                    'Sylviculture' => [],
                    'Pêche et aquaculture' => []
                ]
            ],
            'Métiers qualifiés' => [
                'description' => 'Métiers qualifiés de l\'industrie et de l\'artisanat',
                'subcategories' => [
                    'Bâtiment' => [],
                    'Métallurgie' => [],
                    'Artisanat' => [],
                    'Électricité et électronique' => [],
                    'Alimentation' => [],
                    'Bois' => [],
                    'Textile' => []
                ]
            ],
            'Opérateurs et assembleurs' => [
                'description' => 'Conducteurs d\'installations et de machines',
                'subcategories' => [
                    'Opérateurs d\'installations fixes' => [],
                    'Assembleurs' => [],
                    'Conducteurs de véhicules' => []
                ]
            ],
            'Professions élémentaires' => [
                'description' => 'Professions élémentaires',
                'subcategories' => [
                    'Nettoyage et aide aux ménages' => [],
                    'Manœuvres' => [],
                    'Assistants de préparation alimentaire' => []
                ]
            ],
            'Économie numérique' => [
                'description' => 'Nouvelles professions de l\'économie numérique',
                'subcategories' => [
                    'Développement logiciel' => [],
                    'Data et IA' => [],
                    'Cybersécurité' => [],
                    'Marketing digital' => []
                ]
            ],
            'Économie verte' => [
                'description' => 'Métiers de la transition écologique',
                'subcategories' => [
                    'Énergies renouvelables' => [],
                    'Économie circulaire' => [],
                    'Protection de l\'environnement' => []
                ]
            ],
            'Industries créatives' => [
                'description' => 'Métiers de la création et du divertissement',
                'subcategories' => [
                    'Arts et spectacles' => [],
                    'Design' => [],
                    'Médias' => [],
                    'Jeux vidéo' => []
                ]
            ],
            'Recherche et innovation' => [
                'description' => 'Métiers de la recherche et développement',
                'subcategories' => [
                    'Recherche fondamentale' => [],
                    'R&D industrielle' => [],
                    'Innovation sociale' => []
                ]
            ]
        ];

        // Code d'insertion
        foreach ($categories as $categoryName => $categoryData) {
            $mainCategoryId = DB::table('profession_categories')->insertGetId([
                'name' => $categoryName,
                'description' => $categoryData['description'],
                'created_at' => now(),
                'updated_at' => now()
            ]);

            foreach ($categoryData['subcategories'] as $subCategoryName => $subCategoryData) {
                $subCategoryId = DB::table('profession_categories')->insertGetId([
                    'name' => $subCategoryName,
                    'description' => "Sous-catégorie de {$categoryName}",
                    'parent_id' => $mainCategoryId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                if (isset($subCategoryData['professions'])) {
                    foreach ($subCategoryData['professions'] as $profession) {
                        DB::table('professions')->insert([
                            'name' => $profession,
                            'description' => "Professionnel en {$subCategoryName}",
                            'category_id' => $subCategoryId,
                            'created_at' => now(),
                            'updated_at' => now()
                        ]);
                    }
                }
            }
        }
    }
}
