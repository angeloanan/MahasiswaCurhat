# LEC-Project

## Task

- [ ] Website design / User flow
- [x] Database Modelling
- [ ] API
- [ ] Front-end
- [ ] Testing / Launching

## Tech stack

- TypeScript: Typed Javascript
- React: UI
- Tailwind CSS: Styling; utility classes
- PostCSS: Optimize CSS (for Tailwind)

- useSWR: Cached data-fetching
- XState: State machine / state management
- Recoil: State management if XState fails
- Zustand: State management if XState and Recoil fails
- Redux: State management if XState, Recoil and Zustand fails

- Next.JS: Client / Server / Routing
- NextAuth: Authentication
- Auth0: Authentication if NextAuth fails
- Clerk: Authentication if NextAuth and Auth0 fails
- Prisma: Database ORM
- Postgres: SQL Database
- MSSQL: fallback if not allowed to use Postgres

- GitHub: Source code host
- Vercel: Web hosting
- Cloudflare workers: If need faster serverless API
- Railway: DB Hosting
- Heroku: Free Postgres if Railway gajadi
