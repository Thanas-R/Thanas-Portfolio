# Writing a blog post

Drop a Markdown file in this folder (`src/content/blogs/`) and it shows up on
the Blogs page automatically — no code changes needed.

## File format

Every `.md` file here needs a small frontmatter block at the top:

```
---
title: My Post Title
subheadline: A short italic deck line under the headline
excerpt: One or two sentences shown on the newspaper front page.
date: 2026-06-01
column: 1
image: /images/my-photo.png
---

Your Markdown body goes here. Headings, lists, quotes, code, tables and
images are all supported.
```

## Fields

- `title` (required) — the headline on the front page and in the reader.
- `subheadline` — italic deck line under the headline.
- `excerpt` — the teaser text shown on the newspaper front page.
- `date` — `YYYY-MM-DD`; newest posts are listed first.
- `column` — `1`, `2` or `3`; which newspaper column the story sits in.
- `image` — optional URL or `/public` image path shown on the front page.

## Notes

- Each post also gets its own URL: `/blogs/<file-name-without-.md>`
  (e.g. `qsg-internship.md` → `/blogs/qsg-internship`).
- Files without a frontmatter block (like this README) are ignored.
