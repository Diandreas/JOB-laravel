@extends('layouts.cv')

@section('content')
    <div class="cv-container">
        <!-- En-tête avec bannière colorée -->
        <header class="cv-header">
            <div class="header-content">
                <div class="personal-info">
                    <h1>{{ $cvInformation['personalInformation']['firstName'] }}</h1>
                    <h2>{{ $cvInformation['professions'][0]['name']}}</h2>
                </div>
                <div class="contact-grid">
                    <div class="contact-item">
                        <i class="bi bi-envelope-fill"></i>
                        {{ $cvInformation['personalInformation']['email'] }}
                    </div>
                    <div class="contact-item">
                        <i class="bi bi-telephone-fill"></i>
                        {{ $cvInformation['personalInformation']['phone'] }}
                    </div>
                    <div class="contact-item">
                        <i class="bi bi-geo-alt-fill"></i>
                        {{ $cvInformation['personalInformation']['address'] }}
                    </div>
                    @if($cvInformation['personalInformation']['linkedin'])
                        <div class="contact-item">
                            <i class="bi bi-linkedin"></i>
                            {{ $cvInformation['personalInformation']['linkedin'] }}
                        </div>
                    @endif
                </div>
            </div>
        </header>

        <!-- Résumé avec fond accent -->
        @if(!empty($cvInformation['summaries']))
            <section class="summary-section">
                <div class="section-content">
                    <p>{{ $cvInformation['summaries'][0]['description'] ?? '' }}</p>
                </div>
            </section>
        @endif

        <!-- Grid principale -->
        <div class="main-grid">
            <div class="left-column">
                <!-- Expériences -->
                @foreach($experiencesByCategory as $category => $experiences)
                    <section class="experience-section">
                        <h2><i class="bi bi-briefcase-fill"></i> {{ $category }}</h2>
                        @foreach($experiences as $experience)
                            <div class="experience-card">
                                <div class="experience-header">
                                    <h3>{{ $experience['name'] }}</h3>
                                    <span class="date">{{ $experience['date_start'] }} - {{ $experience['date_end'] ?? 'Present' }}</span>
                                </div>
                                <div class="company">{{ $experience['InstitutionName'] }}</div>
                                <p class="description">{{ $experience['description'] }}</p>
                                @if($experience['output'])
                                    <div class="achievements">
                                        <p>{{ $experience['output'] }}</p>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </section>
                @endforeach
            </div>

            <div class="right-column">
                <!-- Compétences avec barres de progression -->
                @if(!empty($cvInformation['competences']))
                    <section class="skills-section">
                        <h2><i class="bi bi-gear-fill"></i> Compétences</h2>
                        <div class="skills-grid">
                            @foreach($cvInformation['competences'] as $competence)
                                <div class="skill-card">
                                    <span>{{ $competence['name'] }}</span>
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif

                <!-- Centres d'intérêt avec icônes -->
                @if(!empty($cvInformation['hobbies']))
                    <section class="hobbies-section">
                        <h2><i class="bi bi-heart-fill"></i> Centres d'intérêt</h2>
                        <div class="hobbies-grid">
                            @foreach($cvInformation['hobbies'] as $hobby)
                                <div class="hobby-card">
                                    {{ $hobby['name'] }}
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif
            </div>
        </div>
    </div>

    <style>
        :root {
            --primary-color: #2196F3;
            --primary-dark: #1976D2;
            --accent-color: #FF4081;
            --text-color: #333;
            --text-light: #666;
            --background: #fff;
            --card-background: #f8f9fa;
            --border-radius: 8px;
            --spacing: 1.5rem;
        }

        .cv-container {
            max-width: 210mm;
            margin: 0 auto;
            background: var(--background);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
        }

        /* Header Styles */
        .cv-header {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            padding: var(--spacing);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing);
        }

        .header-content {
            display: grid;
            gap: 1rem;
        }

        .personal-info h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .personal-info h2 {
            font-size: 1.2rem;
            font-weight: 500;
            opacity: 0.9;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        /* Main Grid Layout */
        .main-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: var(--spacing);
            padding: var(--spacing);
        }

        /* Section Styles */
        section {
            margin-bottom: var(--spacing);
        }

        h2 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        /* Experience Cards */
        .experience-card {
            background: var(--card-background);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            margin-bottom: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
        }

        .experience-header h3 {
            font-size: 1.2rem;
            color: var(--primary-dark);
        }

        .date {
            color: var(--text-light);
            font-size: 0.9rem;
        }

        .company {
            color: var(--accent-color);
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        /* Skills and Hobbies */
        .skills-grid, .hobbies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }

        .skill-card, .hobby-card {
            background: var(--card-background);
            padding: 0.8rem;
            border-radius: var(--border-radius);
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        /* Print Styles */
        @media print {
            .cv-container {
                margin: 0;
                padding: 0;
            }

            .cv-header {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            section {
                break-inside: avoid;
            }
        }
    </style>
@endsection
