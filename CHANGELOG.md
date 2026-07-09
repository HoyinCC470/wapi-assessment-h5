# Changelog

## Unreleased

- Keep `Send My Report` and `Share My Identity` as mock-stage result actions until the report/share flow is finalized
- Slow answer auto-advance slightly so selected-state feedback is visible on real devices
- Enlarge result identity artwork inside the result card without changing the page flow
- Add Motion Lite refinements for page entry, module intros, answer selection feedback, and result reveal while respecting reduced-motion settings
- Fix iOS Safari viewport handling so pages use natural document scrolling and avoid bottom toolbar color/scroll conflicts
- Shorten answer auto-advance delay and strengthen result identity card hierarchy with theme-colored accents

## 0.1.3 - 2026-07-08

Assessment progress persistence improvements.

- Add local browser draft persistence for registration fields, current screen, question steps, and answers
- Automatically restore progress after refresh, browser process kill, or returning to the page on the same device/browser
- Keep completed results available instead of clearing saved progress automatically
- Add a result-page restart action to intentionally begin a fresh assessment

## 0.1.2 - 2026-07-08

Assessment quality and scoring improvements.

- Restore the next-step CTA on assessment pages while keeping answer auto-advance
- Add safe navigation handling so manual CTA, previous, and back actions cancel pending auto-advance
- Refactor Module 1 options to explicitly map to voice identity personas
- Rewrite Module 2 as objective expression ability questions with one clear correct answer per question
- Balance Module 2 dimensions with four questions each for language, logic, communication, and audience impact
- Rework result scoring so expression stars are based on per-dimension correctness instead of soft option weighting

## 0.1.1 - 2026-07-07

Infrastructure and deployment improvements.

- Update page title from "Prototype" to "WAPI Assessment"
- Add GitHub Actions CI/CD workflow for automatic deployment to production on `main` push
- Remove hardcoded local cache path from `.npmrc` for CI compatibility
- Clean up conflicting root `.git` directory

## 0.1.0 - 2026-06-29

Initial stable prototype baseline for the WAPI H5 assessment flow.

Included in this baseline:

- Register page visual system and responsive layout
- Module 1 and Module 2 transition pages
- Module 1 and Module 2 assessment flow with auto-advance interactions
- Dynamic result page structure
- Real persona artwork mapping for current supported result types
- Expression test counter UI and updated result copy
- Shared UI spec and frontend engineering baseline

This release should be treated as the reference point for future PM and UI collaboration.
