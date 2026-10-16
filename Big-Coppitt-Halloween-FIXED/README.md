# Big Coppitt Halloween Bike Ride 🎃

Cute orange-and-purple interactive map of Sweet Stops. Neighbors can place a pumpkin and submit their own address; it appears publicly immediately **without organizer approval**. The organizer may hide or delete a stop using a secret token. The park star is adjustable.

## Important: unzip before uploading

The ZIP contains **the actual site files at its top level**:

```
index.html
style.css
app.js
netlify.toml
package.json
netlify/
  functions/
    _shared.mjs
    stops.mjs
    submit.mjs
    admin.mjs
```

Do **not** upload the `.zip` as one file to GitHub. Unzip it first, then upload its files and folders. Ensure `index.html` and `netlify.toml` appear **at the top level of your GitHub repository** (not in a `big-coppitt-...` folder). `netlify/functions/` must be included. On GitHub's **Add file → Upload files** screen, drag the extracted files AND the `netlify` folder together, preserving the `netlify/functions` folder structure. If your browser does not preserve folders, use GitHub Desktop or push with git.

## Start fresh on Netlify

1. Create a **new empty GitHub repository**, or remove the old site's contents before committing these files. Upload everything from the extracted ZIP to the repo root and commit to `main`.
2. On [Netlify](https://app.netlify.com), choose **Add new project → Import an existing project → GitHub** and select the new repo.
3. Build command: **leave blank**. Publish directory: **`.` (period)**. Base directory: **leave blank**. Functions directory is set to `netlify/functions` in `netlify.toml`.
4. Go to **Project configuration → Environment variables**, create `ADMIN_TOKEN` with a **random secret 24 or more characters**. Make it available to Functions (and all deploy contexts). **Save it privately**. Redeploy so the function sees it.
5. Once deployed, open the URL and confirm the map loads. Open **Organizer**, paste your token, and move/save the starting star to the exact park entrance at Avenue F and 3rd St.
6. Submit a **test Sweet Stop** with a Big Coppitt address and map pin. Verify that it appears publicly on the map immediately. Hide/delete the test stop in Organizer. Share your public URL only after this test works.

### If Netlify says `Deploy directory 'public' does not exist`

It is deploying the **wrong files/old configuration**. Confirm that the deployed Git commit includes this `netlify.toml`, where `[build] publish = "."`, and that the Netlify site is connected to the intended repo/branch. In Netlify's **Project configuration → Build & deploy → Build settings**, check that Base directory is blank, and Publish directory is `.`. Trigger a fresh deploy. No `npm run build` is necessary; the site is plain HTML/CSS/JS.

### If neighbors can't submit

Confirm the three function files plus `_shared.mjs` exist in `netlify/functions/` in the GitHub repo and show up under Netlify **Functions** after deploy. Netlify Blobs is used for persistent Sweet Stop data; local `file://` previews cannot save stops. Check the function logs in Netlify for storage/configuration errors.

### Organizer security and public submissions

- Keep `ADMIN_TOKEN` secret, never add it to GitHub or post it in your neighborhood group. Only the organizer page uses it; it is not saved in browser storage.
- Anyone can submit a stop without approval, as requested. That also means someone can post an incorrect or unwanted stop. Visit the Organizer tab to hide/delete any that should not appear. Share only addresses you own or are authorized to list.
- Stops are **not** restricted to October dates and remain stored until deleted. Remove old addresses after the event.
- The map start pin is intentionally approximate until you save its location in Organizer.

## Files

- `index.html`, `style.css`, `app.js`: public, mobile-friendly interactive map and submission form
- `netlify/functions/submit.mjs`: saves user submissions immediately as approved
- `netlify/functions/stops.mjs`: serves visible stops to everyone
- `netlify/functions/admin.mjs`: lets token holder hide/delete stops or adjust starting point
- `netlify/functions/_shared.mjs`: shared secure token check and Netlify Blobs storage

All Netlify functions run on Netlify, not on GitHub Pages or simple file hosting.
