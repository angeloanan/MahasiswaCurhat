# LEC-Project

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

- useSWR: Cached data-fetching
- XState: State management using state machines
- Jotai: State management using atomomic approach
- Zustand (Fallback Flux pattern): State management
- Redux (Fallback fallback flux pattern): State management if XState, Recoil, Zustand and Jotai fails

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
