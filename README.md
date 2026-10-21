# A9 Epoxy Inspirations

Premium static website prototype for a future WordPress / Elementor build.

## Run locally

From this folder, start any static server, for example:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

On Windows, you can also double-click `start-local.bat` in this folder. Keep the opened terminal running while viewing the site.

## Included experience

- Five responsive views: Home, Our Creations, About the Artist, Customization Guide, and Contact.
- Shared responsive header, mobile navigation, footer, button system, FAQ accordions, and reveal motion.
- The homepage hero uses a full-bleed responsive background video with a solid palette fallback if the video cannot load or play.
- Portfolio category filters and editable sample artwork cards.
- Transparent enquiry-form validation. No form submission is claimed until a real endpoint is configured.
- Instagram, WhatsApp, and email actions are connected to the supplied business contact details.
- Temporary remote artwork imagery is marked as sample imagery and is kept in replaceable `<img>` elements.
- Provisional categories currently shown: customized resin art, decorative art, personalized gifts, home decor, and keepsakes / special pieces.

## Replace before publishing

1. Add a genuine form endpoint in `script.js` inside `A9_CONFIG` before publishing if the enquiry form should send messages.
2. Replace the temporary image `src` values and matching alt text in `index.html`.
3. Replace the editable artist story, policies, FAQs, pricing copy, and remaining business placeholders with confirmed information. The current pricing language is only a provisional custom-quotation description based on design, size, materials, and requirements.
4. Move the page sections into Elementor containers/widgets when the WordPress environment is available. The visual structure is intentionally component-like so sections can be recreated as reusable Elementor templates.

This workspace did not contain an existing WordPress installation, Elementor templates, or a plugin manifest, so no WordPress settings or plugins were changed.
