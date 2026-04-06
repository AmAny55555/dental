<?php

$origins = env('CORS_ALLOWED_ORIGINS');
$allowedOrigins = ($origins !== null && $origins !== '')
    ? array_values(array_filter(array_map('trim', explode(',', $origins))))
    : ['*'];

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Without matching paths, Laravel does not attach CORS headers. This file
    | must exist so api/* requests receive Access-Control-Allow-Origin, etc.
    |
    | CORS_ALLOWED_ORIGINS: comma-separated list, e.g.
    | http://localhost:3000,https://your-frontend.example.com
    | Omit or leave empty to allow all origins (*), which cannot be used with
    | supports_credentials => true.
    |
    */

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        // When the app is served under …/backend/public/… (document root above public)
        'backend/public/api/*',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins,

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => (bool) env('CORS_SUPPORTS_CREDENTIALS', false),

];
