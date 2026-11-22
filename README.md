# Web Development Server

Run `npm install` and `npm start` from this directory. Express listens on port 4000 locally. Run `npm run dev` to restart on edits. Set `NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000` in the Next.js client's `.env.development`.

For Render, select branch `a5`, use `npm install` to build and `npm start` to run. Set `SERVER_ENV=production`, `CLIENT_URL` to the exact Vercel A5 origin, `SERVER_URL` to the Render hostname, and `SESSION_SECRET` to a private value. On Vercel Preview for branch `a5`, set `NEXT_PUBLIC_HTTP_SERVER` to the HTTPS Render origin before redeploying.
