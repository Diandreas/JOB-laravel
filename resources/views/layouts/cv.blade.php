<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $cvInformation['personalInformation']['firstName'] ?? 'CV' }} - CV</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        @page {
            margin: 0;
        }

        @media print {
            body {
                padding: 0;
                margin: 0;
            }
        }
    </style>
    @stack('styles')
</head>
<body>
@yield('content')
</body>
</html>
