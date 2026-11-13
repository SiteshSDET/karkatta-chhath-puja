# Chhath Puja · Karkatta

Static site for the Karkatta Chhath Puja member register and media gallery.

## Supabase setup

1. In the Supabase SQL Editor, run the updated `supabase-setup.sql`. It adds the shared event title field while preserving existing rows.
2. In Authentication, create the administrator account.
3. In the SQL file's final commented statement, replace `admin@example.com` with the administrator's email, uncomment the statement, and run it. This assigns the `register_admin` authorization claim. Do not grant admin access to regular members.
4. The register is visible on the landing page and can be exported as a read-only, downloadable PDF (mobile devices can save it from the share sheet). Use **Manager** to edit the register, update the celebration title/year in **Site details**, or open the photo/video manager.

The gallery includes clearly labeled illustrative photo/video samples. Photo and video selections made in Manager are currently browser-local previews for the current session; they are not uploaded to Supabase Storage or shared with other visitors.

The browser app uses the project's public publishable key. Never put a Supabase `service_role` or secret key in this static site.

## Deploy

Push to `main` to deploy the static files to GitHub Pages. The workflow publishes the site and local sample assets, and fingerprints CSS/JavaScript URLs with the commit SHA so updated files are not held behind stale browser caches. The database setup script is not part of the public site artifact.
