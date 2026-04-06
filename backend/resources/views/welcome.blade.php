<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ str_starts_with(app()->getLocale(), 'ar') ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Dental') }}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;700&family=Noto+Serif:wght@500;700&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="pristine-body">
    <div class="pristine-orb pristine-orb-one" aria-hidden="true"></div>
    <div class="pristine-orb pristine-orb-two" aria-hidden="true"></div>

    <header class="top-nav glass-panel">
        <div class="brand-block">
            <p class="overline">Pristine Clinic Suite</p>
            <h1 class="brand-title">Dental Operations</h1>
        </div>

        @if (Route::has('login'))
            <nav class="nav-actions" aria-label="auth links">
                @auth
                    <a href="{{ url('/dashboard') }}" class="btn btn-primary">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="btn btn-ghost">Log in</a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="btn btn-primary">Register</a>
                    @endif
                @endauth
            </nav>
        @endif
    </header>

    <main class="layout-shell">
        <section class="hero-card rounded-2xl">
            <div>
                <p class="overline">Smart Care Platform</p>
                <h2 class="hero-title">Premium workflow for appointments, treatments, and records.</h2>
                <p class="hero-copy">
                    A modern control center for dental teams with clean hierarchy, generous spacing, and a focused experience for daily clinical operations.
                </p>
            </div>

            <div class="hero-actions">
                <a href="{{ Route::has('login') ? route('login') : '#' }}" class="btn btn-primary">Start Session</a>
                <a href="https://laravel.com/docs" target="_blank" class="btn btn-ghost">Documentation</a>
            </div>

            <div class="metric-grid">
                <article class="metric-card rounded-2xl">
                    <p>Appointment Flow</p>
                    <strong>Realtime</strong>
                </article>
                <article class="metric-card rounded-2xl">
                    <p>Patient Profiles</p>
                    <strong>Secure</strong>
                </article>
                <article class="metric-card rounded-2xl">
                    <p>Billing Status</p>
                    <strong>Unified</strong>
                </article>
            </div>
        </section>

        <aside class="side-stack">
            <section class="glass-panel info-card rounded-2xl">
                <h3>Why this UI</h3>
                <ul>
                    <li>Elegant emerald and gold palette for a premium brand presence.</li>
                    <li>RTL-friendly spacing and alignment with Arabic-compatible typography.</li>
                    <li>Rounded, touch-friendly actions for desktop and mobile clarity.</li>
                </ul>
            </section>

            <section class="glass-modal rounded-2xl" role="dialog" aria-label="preview modal">
                <p class="overline">Glassmorphism Preview</p>
                <h3>Upcoming Feature</h3>
                <p>Automated reminders and follow-up timelines with a single timeline view.</p>
                <button class="btn btn-primary btn-full" type="button">Notify Me</button>
            </section>
        </aside>
    </main>

    <footer class="footer-note">
        <span>v{{ app()->version() }}</span>
        <a href="https://github.com/laravel/laravel/blob/13.x/CHANGELOG.md" target="_blank">View changelog</a>
    </footer>
</body>
</html>
