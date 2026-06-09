# UI Improvement TODO (@Nexus)

## Step 1: Baseline review
- [x] Read global styles: `src/index.css`
- [x] Read routing/layout shell: `src/App.tsx`
- [x] Read shared layout components: `src/components/layout/DashboardLayout.tsx`, `Navbar.tsx`, `Sidebar.tsx`

## Step 2: Shared UI components polish (no logic/data changes)
- [x] Improve `src/components/ui/*` (Button/Card/Input/Avatar/Badge) visual hierarchy, states, spacing, focus rings

## Step 3: Layout polish
- [ ] Improve `DashboardLayout` spacing/padding responsiveness
- [ ] Improve `Navbar` hover/active/focus consistency + mobile menu spacing
- [ ] Improve `Sidebar` item styling consistency

## Step 4: Page-by-page UI polish
- [ ] Apply consistent page headers and container spacing across all pages in `src/pages/**`
- [ ] Improve empty/loading states styling where present
- [ ] Improve list/card/table row hover/dividers consistency

## Step 5: Feature components polish
- [ ] Chat components: message bubbles, list separators, empty state visuals
- [ ] Calendar components: event cards/cell alignment visuals
- [ ] Video call components: modal/control spacing and backdrop hierarchy
- [ ] Collaboration/cards: CTA buttons + card spacing

## Step 6: Quality checks
- [ ] Run `npm run lint` (if available) and `npm run build`
- [ ] Smoke test key routes

