@extends('layouts.cv')

@section('content')
    <div class="cv-container">
        <!-- En-tête -->
        <header>
            <div class="header-content">
                <div class="header-main">
                    <h1>{{ $cvInformation['personalInformation']['firstName'] }}</h1>
                    <div class="profession">{{ $cvInformation['professions'][0]['name']}}</div>
                </div>
                <div class="header-contact">
                    <div class="contact-item">
                        <i class="bi bi-envelope"></i>
                        <span>{{ $cvInformation['personalInformation']['email'] }}</span>
                    </div>
                    <div class="contact-item">
                        <i class="bi bi-telephone"></i>
                        <span>{{ $cvInformation['personalInformation']['phone'] }}</span>
                    </div>
                    <div class="contact-item">
                        <i class="bi bi-geo-alt"></i>
                        <span>{{ $cvInformation['personalInformation']['address'] }}</span>
                    </div>
                    @if($cvInformation['personalInformation']['linkedin'])
                        <div class="contact-item">
                            <i class="bi bi-linkedin"></i>
                            <span>{{ $cvInformation['personalInformation']['linkedin'] }}</span>
                        </div>
                    @endif
                </div>
            </div>
        </header>

        <!-- Résumé -->
        @if(!empty($cvInformation['summaries']))
            <section class="summary">
                <div class="section-title">
                    <i class="bi bi-person-lines-fill"></i>
                    <h2>Profil Professionnel</h2>
                </div>
                <div class="summary-content">
                    {{ $cvInformation['summaries'][0]['description'] ?? '' }}
                </div>
            </section>
        @endif

        <!-- Timeline des expériences -->
        @foreach($experiencesByCategory as $category => $experiences)
            <section class="timeline-section">
                <div class="section-title">
                    <i class="bi bi-briefcase"></i>
                    <h2>{{ $category }}</h2>
                </div>
                <div class="timeline">
                    @foreach($experiences as $experience)
                        <div class="timeline-item">
                            <div class="timeline-marker">
                                <div class="year">{{ \Carbon\Carbon::parse($experience['date_start'])->format('Y') }}</div>
                                <div class="dot"></div>
                                <div class="line"></div>
                            </div>
                            <div class="timeline-content">
                                <div class="time-period">
                                    <span>{{ $experience['date_start'] }}</span>
                                    <span class="separator">→</span>
                                    <span>{{ $experience['date_end'] ?? 'Present' }}</span>
                                </div>
                                <h3>{{ $experience['name'] }}</h3>
                                <div class="company">
                                    <i class="bi bi-building"></i>
                                    {{ $experience['InstitutionName'] }}
                                </div>
                                <div class="description">
                                    <p>{{ $experience['description'] }}</p>
                                    @if($experience['output'])
                                        <div class="achievements">
                                            <div class="achievement-item">
                                                <i class="bi bi-check-circle"></i>
                                                <span>{{ $experience['output'] }}</span>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </section>
        @endforeach

        <!-- Compétences et Centres d'intérêt en bas -->
        <div class="bottom-sections">
            @if(!empty($cvInformation['competences']))
                <section class="skills-section">
                    <div class="section-title">
                        <i class="bi bi-gear"></i>
                        <h2>Compétences</h2>
                    </div>
                    <div class="skills-list">
                        @foreach($cvInformation['competences'] as $competence)
                            <div class="skill-item">{{ $competence['name'] }}</div>
                        @endforeach
                    </div>
                </section>
            @endif

            @if(!empty($cvInformation['hobbies']))
                <section class="hobbies-section">
                    <div class="section-title">
                        <i class="bi bi-heart"></i>
                        <h2>Centres d'intérêt</h2>
                    </div>
                    <div class="hobbies-list">
                        @foreach($cvInformation['hobbies'] as $hobby)
                            <div class="hobby-item">{{ $hobby['name'] }}</div>
                        @endforeach
                    </div>
                </section>
            @endif
        </div>
    </div>

    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2980b9;
            --text-color: #2c3e50;
            --text-light: #7f8c8d;
            --border-color: #ecf0f1;
            --timeline-color: #bdc3c7;
            --background-light: #f8f9fa;
            --spacing: 1.5rem;
        }

        .cv-container {
            width: calc(210mm - 60px); /* A4 width minus margins */
            min-height: calc(297mm - 60px); /* A4 height minus margins */
            padding: var(--spacing);
            font-family: 'Source Sans Pro', sans-serif;
            color: var(--text-color);
            background: white;
        }

        /* Header Styles */
        header {
            margin-bottom: calc(var(--spacing) * 2);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: var(--spacing);
        }

        .header-main h1 {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin: 0;
        }

        .profession {
            font-size: 1.2rem;
            color: var(--text-light);
            margin-top: 0.5rem;
        }

        .header-contact {
            display: grid;
            gap: 0.5rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-light);
        }

        /* Section Titles */
        .section-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: var(--spacing);
        }

        .section-title i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }

        .section-title h2 {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin: 0;
        }

        /* Timeline Styles */
        .timeline {
            position: relative;
            padding-left: calc(var(--spacing) * 2);
        }

        .timeline-item {
            position: relative;
            margin-bottom: calc(var(--spacing) * 2);
        }

        .timeline-marker {
            position: absolute;
            left: calc(var(--spacing) * -2);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .year {
            color: var(--primary-color);
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .dot {
            width: 1rem;
            height: 1rem;
            background: var(--primary-color);
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 2px var(--primary-color);
        }

        .line {
            position: absolute;
            top: 2rem;
            width: 2px;
            height: calc(100% + var(--spacing));
            background: var(--timeline-color);
            z-index: -1;
        }

        .timeline-content {
            background: var(--background-light);
            padding: var(--spacing);
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
        }

        .time-period {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .separator {
            margin: 0 0.5rem;
        }

        .timeline-content h3 {
            margin: 0 0 0.5rem 0;
            color: var(--secondary-color);
        }

        .company {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-light);
            margin-bottom: 1rem;
        }

        .description {
            color: var(--text-color);
        }

        .achievements {
            margin-top: 1rem;
            padding-left: 1rem;
        }

        .achievement-item {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .achievement-item i {
            color: var(--primary-color);
        }

        /* Bottom Sections */
        .bottom-sections {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing);
            margin-top: calc(var(--spacing) * 2);
        }

        .skills-list, .hobbies-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .skill-item, .hobby-item {
            background: var(--background-light);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            border: 1px solid var(--border-color);
        }

        /* Print Styles */
        @media print {
            .cv-container {
                padding: 0;
                margin: 0;
            }

            section {
                break-inside: avoid;
            }

            .timeline-item {
                break-inside: avoid;
            }
        }

        /* Responsive Styles */
        @media screen and (max-width: 768px) {
            .header-content {
                flex-direction: column;
            }

            .bottom-sections {
                grid-template-columns: 1fr;
            }
        }
    </style>
@endsection
