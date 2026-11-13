# Chhath Puja · Karkatta

Static site for the Karkatta Chhath Puja member register and media gallery.

## Supabase setup

1. In the Supabase SQL Editor, run the updated `supabase-setup.sql`. It adds editable banner settings, shared gallery metadata, expenditure records, and the previous-year Hisab carry-forward; creates a public media bucket with admin-only upload/delete access; and preserves existing rows. The bucket has no extra per-file cap; Supabase's project/plan upload limit still applies.
2. In Authentication, create the administrator account.
3. In the SQL file's final commented statement, replace `admin@example.com` with the administrator's email, uncomment the statement, and run it. This assigns the `register_admin` authorization claim. Do not grant admin access to regular members.
4. The register is visible on the landing page. **View / Print PDF** opens the generated PDF in a browser viewer for printing or saving; **Download PDF** saves it directly. The public **Hisab** section calculates balance as previous-year carry-forward plus current member receipts minus saved expenditures. Managers can edit the carry-forward and expenditures in **Manager → Hisab**. The report can be viewed, printed, or downloaded. Use **Manager** to edit the register, update the celebration title/year and banner text/photo in **Site details**, manage member photos, or add/delete shared gallery photos and videos. In **Gallery by year**, set the year for uploads; after the first upload for a year, that year is available in the public gallery selector. Filter the Manager gallery by year to manage existing uploads. Add a caption before choosing gallery files to show it alongside each upload in that batch. Each Manager section has a save action; member photos and gallery uploads are also saved as each file operation completes.

The gallery includes clearly labeled illustrative photo/video samples for 2026 and swipeable member cards. Manager photo/video uploads are stored in Supabase Storage and shared with site visitors. The Supabase project upload-size limit is the effective maximum; large-file limits depend on the project's plan and configuration.

The browser app uses the project's public publishable key. Never put a Supabase `service_role` or secret key in this static site.

## Deploy

Push to `main` to deploy the static files to GitHub Pages. The workflow publishes the site and local sample assets, and fingerprints CSS/JavaScript URLs with the commit SHA so updated files are not held behind stale browser caches. The database setup script is not part of the public site artifact.
