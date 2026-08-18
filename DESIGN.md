# OpenFoot design system

**Version:** 2.0.0  
**Direction:** Buffer-calibrated · Clear football product
**Palette:** Brand Mint

This document is the human-readable authority for OpenFoot's identity and
interface foundations. Machine-readable values live in `tokens/`; production
components render those values in the frontend and `/design` demonstrates them.

## Brand idea

OpenFoot is **The open football manager.** It gives players a club to run and a
football world the community can help shape.

- Brand promise: **Run the club. Shape the game.**
- Primary action: **Play OpenFoot**
- Secondary action: **Explore the Studio**

Write about observable decisions and workflows. Do not invent player counts,
licenses, testimonials, availability, operational guarantees, or publication
state. “Open” describes the product model only where repository evidence proves
the claim.

## Identity

The existing footballer-and-ball silhouette is the mark. Preserve its
recognizable gesture and relationship to the ball. Optical correction and
vector reconstruction are permitted; replacement with a generic monogram or a
new mascot is not.

The default expression pairs Community Ink with Brand Mint. The measured light
system uses Canvas `#FEFDFB`, Paper `#FFFFFF`, Ink `#213130`, action
`#283E3D`, and Mint `#B0EC9C`. The mark must
also work in monochrome, at favicon size, and over both semantic canvas colors.
Use derivatives declared in `brand/manifest.json`; do not recolor exported PNGs
ad hoc.

The approved transparent masters are `brand/mark/openfoot-mark.svg` and its
inverse. They are deterministic exports of the approved raster geometry, not a
newly generated silhouette. Governed horizontal lockups pair that geometry with
the approved Figtree treatment. Root lockup PNGs remain migration evidence
only and have no active frontend consumer.

## Color: Brand Mint

The core palette begins with Community Ink `#213130` and Brand Mint
`#B0EC9C`. Canvas `#FEFDFB`, Paper `#FFFFFF`, Night, Lavender, Fresh Mint, and
Warm Peach support those anchors. These values and their interface proportions
are calibrated from Buffer's current public system. Semantic purpose, not visual similarity, chooses a token. Success,
warning, danger, live, selected, and brand emphasis remain separate roles.

Light and Dark expose the same semantic paths. Dark is not a blanket inversion:
it is a composed theme. Match and broadcast moments may be darker, while
routine management and creation surfaces default to the softer clubhouse
expression.

## Typography

Figtree owns display headings, interface, and reading text. The public display
scale tops out at `75.8px`, section headings at `56.8px`, body copy at `18px`,
and compact product forms at `14.3px`. Geist Mono supports technical and
comparable football data. Numerical football data uses tabular figures. Fonts
are locally served; the interface must not depend on a runtime request to a font
CDN. Stolzl is not redistributed because it requires its own license; Figtree
uses the same measured layout roles until a licensed source is available.

## Shape, depth, icons, and motion

Compact controls use 6px or 10px radii, feature panels use 20px, and pills are
reserved for prominent actions, compact statuses, or filters. Borders carry most separation;
shadows are quiet and contextual. Lucide is the default interface icon family.
Icons support text and structure rather than decorate every label.

Motion explains orientation, hierarchy, or state. It is brief, interruptible,
and absent under reduced-motion preference. Avoid ambient floating, gratuitous
parallax, and sport-broadcast theatrics on routine screens.

## Component and voice rules

Components consume semantic tokens, expose visible focus, preserve native
semantics, and represent loading, empty, error, denied, success, and destructive
states truthfully. Hidden controls never substitute for backend authorization.
Dense football information should remain comparable rather than being split
into decorative cards without a usability reason.

Use concise, natural football language. Prefer direct verbs: build, pick, play,
review, publish. Keep status and error copy literal. Humanization must never
blur permissions, failures, conflicts, or whether a proposal is merely
submitted versus actually published. Avoid generic hype, fake urgency, abstract
transformation language, repetitive conclusions, and templated AI cadence.

## Evidence registry

| Claim | Status | Evidence |
| --- | --- | --- |
| OpenFoot is a football management game | Approved | Product routes and domain contracts |
| Players can run club decisions | Approved | Play routes and services |
| Studio supports contribution workflows | Approved | Studio proposal and review contracts |
| OpenFoot has official football licenses | Prohibited | No evidence |
| OpenFoot is always available or fully synchronized | Prohibited | No operational evidence |
| A submitted proposal is published | Prohibited | Domain states distinguish submission and publication |

## Accessibility and release

Target WCAG 2.2 AA for text, controls, focus, reflow, keyboard use, and semantic
states in Light and Dark. Never encode meaning by color alone. Every consumer
migration requires automated gates, browser review, public-safe fixtures, and a
reversible migration unit.
