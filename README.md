# Mahasiswa Curhat

## Developing

You will need to have Git installed and setup on your computer (duh).

You will need to install [NodeJS](https://nodejs.org/) (LTS or Current doesn't matter).  
You will also need [Yarn Classic](https://classic.yarnpkg.com/lang/en/); To install it, run

```
npm install --global yarn
```

### Cloning and installing dependencies

Clone the repository and install dependencies:

```
git clone https://github.com/angeloanan/MahasiswaCurhat.git
yarn install
```

You then would need to copy `.env.example` file and rename it to `.env`.  
Fill the `.env` file with your database credentials (ask Angelo if you need help with this).

### Developing

To run the development server, run

```
yarn dev
```

Source codes are located in the [`src` folder](./src/). Changing a line of code will automatically reflect the changes in the browser (hot reload).

### Committing

We are using [Angular commit message guideline](https://gist.github.com/brianclements/841ea7bffdb01346392c). Though it is not enforced, please follow the guideline regardless.

## Task

- [ ] Website design / User flow
- [x] Database Modelling
- [ ] API
- [ ] Front-end
- [ ] Testing / Launching

## Tech stack

https://jamstack.org

- TypeScript: Typed Javascript
- React: UI
- Tailwind CSS: Styling; utility classes
- PostCSS: Optimize CSS (for Tailwind)
- Headless UI: Unstyled Tailwind UI Component
- FeatherIcons: Icon set

---

- useSWR: Cached data-fetching
- XState: State management using state machines
- Jotai: State management using atomomic approach
- Zustand (Fallback Flux pattern): State management
- Redux (Fallback fallback flux pattern): State management if XState, Recoil, Zustand and Jotai fails

---

- Next.JS: Client / Server / Routing
- NextAuth: Authentication
- Auth0: Authentication if NextAuth fails
- Clerk: Authentication if NextAuth and Auth0 fails
- Prisma: Database ORM
- Postgres: SQL Database
- MSSQL: fallback if not allowed to use Postgres

---

- GitHub: Source code host
- Vercel: Web hosting
- Cloudflare workers: If need faster serverless API
- Railway: DB Hosting
- Heroku: Free Postgres if Railway gajadi
