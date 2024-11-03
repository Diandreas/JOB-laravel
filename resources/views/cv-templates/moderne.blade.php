@extends('layouts.cv')

@section('content')
    <div class="container-fluid p-0">
        <!-- Header Section -->
        <header class="bg-primary text-white py-3">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fw-bold mb-0" style="font-size: 16px;">{{ $cvInformation['personalInformation']['firstName'] }}</h1>
                        <h2 style="font-size: 14px;" class="text-white-50 mb-2">{{ $cvInformation['professions'][0]['name'] }}</h2>
                        <div class="d-flex d-print-flex flex-wrap gap-2">
                        <span class="badge bg-light text-primary" style="font-size: 8px;">
                            <i class="bi bi-envelope-fill me-1"></i>{{ $cvInformation['personalInformation']['email'] }}
                        </span>
                            <span class="badge bg-light text-primary" style="font-size: 8px;">
                            <i class="bi bi-telephone-fill me-1"></i>{{ $cvInformation['personalInformation']['phone'] }}
                        </span>
                            <span class="badge bg-light text-primary" style="font-size: 8px;">
                            <i class="bi bi-geo-alt-fill me-1"></i>{{ $cvInformation['personalInformation']['address'] }}
                        </span>
                            @if($cvInformation['personalInformation']['linkedin'])
                                <span class="badge bg-light text-primary" style="font-size: 8px;">
                                <i class="bi bi-linkedin me-1"></i>{{ $cvInformation['personalInformation']['linkedin'] }}
                            </span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container py-2">
            <!-- Summary Section -->
            @if(!empty($cvInformation['summaries']))
                <div class="row mb-2">
                    <div class="col-12">
                        <div class="border-bottom pb-2">
                            <h3 style="font-size: 12px;" class="text-primary mb-1">
                                <i class="bi bi-person-lines-fill me-1"></i>À propos de moi
                            </h3>
                            <p style="font-size: 10px;">
                                {{ $cvInformation['summaries'][0]['description'] ?? '' }}
                            </p>
                        </div>
                    </div>
                </div>
            @endif

            <!-- Main Content avec colonnes fixes -->
            <div class="row d-print-flex">
                <!-- Left Column - Experience -->
                <div class="col-8 d-print-block">
                    @foreach($experiencesByCategory as $category => $experiences)
                        <div class="mb-3">
                            <h3 style="font-size: 12px;" class="text-primary border-bottom pb-1 mb-2">
                                <i class="bi bi-briefcase-fill me-1"></i>{{ $category }}
                            </h3>

                            @foreach($experiences as $experience)
                                <div class="mb-2 pb-2">
                                    <div style="font-size: 8px;" class="badge bg-primary mb-1">
                                        {{ $experience['date_start'] }} - {{ $experience['date_end'] ?? 'Present' }}
                                    </div>
                                    <h4 style="font-size: 11px;" class="text-primary mb-0">{{ $experience['name'] }}</h4>
                                    <h5 style="font-size: 10px;" class="text-muted mb-1">{{ $experience['InstitutionName'] }}</h5>
                                    <p style="font-size: 10px;" class="mb-1">{{ $experience['description'] }}</p>
                                    @if($experience['output'])
                                        <p style="font-size: 10px;" class="mb-0 text-muted">{{ $experience['output'] }}</p>
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>

                <!-- Right Column - Skills & Hobbies -->
                <div class="col-4 d-print-block">
                    @if(!empty($cvInformation['competences']))
                        <div class="mb-3">
                            <h3 style="font-size: 12px;" class="text-primary border-bottom pb-1 mb-2">
                                <i class="bi bi-gear-fill me-1"></i>Compétences
                            </h3>
                            <div class="d-flex d-print-flex flex-wrap gap-1">
                                @foreach($cvInformation['competences'] as $competence)
                                    <span style="font-size: 8px;" class="badge bg-light text-primary">
                                    {{ $competence['name'] }}
                                </span>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    @if(!empty($cvInformation['hobbies']))
                        <div>
                            <h3 style="font-size: 12px;" class="text-primary border-bottom pb-1 mb-2">
                                <i class="bi bi-heart-fill me-1"></i>Centres d'intérêt
                            </h3>
                            <div class="d-flex d-print-flex flex-wrap gap-1">
                                @foreach($cvInformation['hobbies'] as $hobby)
                                    <span style="font-size: 8px;" class="badge bg-light text-primary">
                                    {{ $hobby['name'] }}
                                </span>
                                @endforeach
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <style>
        @media print {
            body {
                width: 100%;
                margin: 0;
                padding: 0;
            }

            .container {
                width: 100% !important;
                max-width: none !important;
                padding: 0 !important;
            }

            .row {
                display: flex !important;
                width: 100% !important;
                margin: 0 !important;
            }

            .col-8 {
                width: 66.666667% !important;
                flex: 0 0 66.666667% !important;
                max-width: 66.666667% !important;
                padding-right: 15px !important;
            }

            .col-4 {
                width: 33.333333% !important;
                flex: 0 0 33.333333% !important;
                max-width: 33.333333% !important;
            }

            .d-print-flex {
                display: flex !important;
            }

            .d-print-block {
                display: block !important;
                page-break-inside: avoid !important;
            }

            .bg-primary {
                background-color: #0d6efd !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            .text-primary {
                color: #0d6efd !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            .badge {
                border: 1px solid #0d6efd !important;
            }
        }
    </style>
@endsection
