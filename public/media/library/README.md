# Lexonz web library

Source: the user-provided `Lexonz pics/` folder. Original camera files are not modified or published.

- 525 unique photographs and 60 unique videos, deduplicated by SHA-256.
- Photos: JPEG, longest edge at most 1600px; gallery thumbnails at most 640px.
- Videos: H.264 MP4, 24fps, at most 1280 × 720 within the original aspect ratio, AAC audio where the source has audio, and fast-start metadata.
- Every video has a poster and a thumbnail. Full videos load only when opened; muted page previews load only while visible and respect reduced-motion/data-saving preferences.
- `catalog.js` supplies bilingual labels and collection metadata. Named circuits are assigned only from identifiable source folders; unlabelled material stays in the general archive.
- `SOURCES.json` records original filenames and hashes for traceability.

Gallery pages show 24 items at a time. The full-resolution web image or playable video loads when a visitor opens the viewer. Some camera footage has no source audio; no music or artificial sound was added.
