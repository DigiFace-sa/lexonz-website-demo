# Updating the media library

Run from the project root on macOS with Node and FFmpeg available. Originals are read-only inputs; all deliverables go under `public/media/library`.

```sh
node scripts/inventory-media.mjs
node scripts/prepare-media.mjs
node scripts/build-media-catalog.mjs
```

If FFmpeg is not on PATH, set `LEXONZ_FFMPEG` to its executable path. `sips` handles photos and FFmpeg uses Apple's H.264 VideoToolbox encoder for videos. Keep `public/media/library/SOURCES.json` when rerunning: its source hashes preserve existing media identifiers, while new files get new identifiers. Previously generated assets are reused, and original camera files remain untouched.

The inventory hashes original files and preserves the first occurrence of exact duplicates. Verify captions and circuit assignments before publication; unknown locations belong in the general archive.
