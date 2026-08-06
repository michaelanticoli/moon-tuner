# Moontuner - Lunar Resonance Hub

A lunar alignment system for tracking intention, energy, and momentum through the Moon's cycles. Live in phase with natural rhythms.

**Live Site**: [moontuner.xyz](https://moontuner.xyz)

## About Moontuner

Moontuner is a lunar alignment system designed to help you live in phase with the Moon's natural cycles. It's not about predictions or horoscopes—it's about tracking intention, energy, and moment[...]

### Key Features

- **Moon Phase Tracking**: Visual representation of current and upcoming lunar phases
- **Intention Setting**: Align your goals and activities with lunar energy
- **Phasecraft Workbooks**: Guided exercises for working with moon cycles
- **The Method**: A comprehensive approach to lunar alignment

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Supabase function secrets

The newsletter signup edge function expects these Supabase secrets to be configured before deploy:

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`

Set them in your Supabase project so `supabase/functions/subscribe-email/index.ts` can route new subscribers to the correct Mailchimp audience without relying on a hard-coded list ID.

### Supabase Auth email verification requirements

User signup in the app uses `supabase.auth.signUp(...)` from the browser (`src/contexts/AuthContext.tsx`). Verification email delivery depends on Supabase Auth configuration outside this repositor[...]

Make sure your Supabase project has all of the following configured:

- Auth email provider/SMTP settings enabled and valid (default Supabase mailer or custom SMTP).
- Email confirmations enabled if you require verified emails before sign-in.
- Site URL and redirect URLs include your deployed callback route (`/auth/callback`), for example `https://moontuner.xyz/auth/callback`.
- Set `VITE_SITE_URL` in your deployed frontend environment to the same public origin allowlisted in Supabase (for example `https://moontuner.xyz`). This keeps signup, magic-link, and password-res[...]

Without valid Supabase Auth email configuration, signup may still return success on the client while verification messages are not delivered.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy via Lovable

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

### Option 2: Deploy to Vercel

This project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

Or connect your GitHub repository to Vercel:
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect the configuration and deploy

### Option 3: Deploy to Hostinger

Host the built site on Hostinger by uploading the production output or using Hostinger's Git/SFTP integrations.

1. Build the project locally: `npm run build`
2. Upload the contents of the generated `dist/` directory to your Hostinger site (for example, to `public_html`) via the Hostinger File Manager, SFTP, or Git integration.
3. In your Hostinger control panel, set the necessary environment variables (for example: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL`, `VITE_SCHOOL_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).
4. Confirm your domain and SSL settings in Hostinger and verify the site.

This approach works for any static host (Hostinger, Netlify, Vercel, etc.) — you just need to upload the built files and configure environment variables where the host provides them.

### Manual Build

To build the project manually for deployment to any static host:

```sh
npm run build
```

This will create a `dist` directory with the production build that can be deployed to any static hosting service.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
