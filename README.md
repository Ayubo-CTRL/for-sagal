# For Sagal

A small pink-and-white website with floating hearts, three photo spots, and a typing terminal.

## Structure

```
for-sagal/
├── index.html        # page content and text
├── css/
│   └── style.css     # colors, layout, hearts (change colors in :root)
├── js/
│   └── main.js       # floating hearts, terminal script, heart burst
├── images/           # put her photos here
└── README.md
```

## Add the photos

Save three pictures in `images/` with these exact names:

- `sagal-1.jpg`
- `sagal-2.jpg`
- `sagal-3.jpg`

Until a photo exists, that spot shows a pink placeholder. Portrait photos (3:4) fit the arch frames best.
To use different file names or `.png`, change the `src` in `index.html`.

## Edit the words

- **Letter and captions:** `index.html`. Look for the `EDIT ME` comment and the `<figcaption>` blocks.
- **Terminal messages:** `TERMINAL_SCRIPT` at the top of the terminal section in `js/main.js`.
- **Colors:** the variables at the top of `css/style.css`.

## Run it

Open `index.html` in a browser. No build step. To serve it locally:

```bash
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Put it on GitHub Pages (optional)

Push the repo, then enable Pages in the repo settings with the branch root as the source.
