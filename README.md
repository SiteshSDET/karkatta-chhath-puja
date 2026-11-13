# Chhath Puja · Karkatta

Static site for the Karkatta Chhath Puja member register and media gallery.

## Supabase setup

1. In the Supabase SQL Editor, run `supabase-setup.sql`.
2. In Authentication, create the administrator account.
3. In the SQL file's final commented statement, replace `admin@example.com` with the administrator's email, uncomment the statement, and run it. This assigns the `register_admin` authorization claim. Do not grant admin access to regular members.
4. The register is managed from **Manager**. Sign in once with the authorized admin account to edit and save the shared register, export its PDF, or open the photo/video manager.

Photo and video selections are currently browser-local previews for the current session; they are not uploaded to Supabase Storage or shared with other visitors.

The browser app uses the project's public publishable key. Never put a Supabase `service_role` or secret key in this static site.

## Deploy

Push to `main` to deploy the static files to GitHub Pages. The workflow publishes `index.html`, `app.js`, and `styles.css`; the database setup script is not part of the public site artifact.
