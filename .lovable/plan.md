

# Redesign: Hero-Centered Glowing Orb Agent UI

## Overview

Replace the current card-based ChatWindow with a large, animated glowing orb as the centerpiece of the landing page -- inspired by the reference image. The orb will be front-and-center with a "Call AI Agent" pill button in the middle. All text (headline, description) moves below the orb.

## Layout Change (Index.tsx)

- Remove the two-column grid layout
- New structure (top to bottom, all centered):
  1. Nav bar (unchanged)
  2. ChatWindow orb -- large, centered, hero position
  3. Headline and description text below the orb
  4. Features section
  5. About and footer (unchanged)

## ChatWindow Redesign (ChatWindow.tsx)

Remove the card container (header, bordered box, footer). Replace with:

- **Glowing Orb**: A large circular element (roughly 280x280px) centered on the page with:
  - A conic-gradient background using gold/amber tones (matching the app's primary color) and dark tones to create a spinning metallic look similar to the reference
  - CSS animation: continuously rotating (`@keyframes spin`) with a soft glow/blur effect around it
  - When connected and agent is speaking, the orb pulses (scale animation via framer-motion) in addition to spinning
  
- **Center Pill Button**: A white/light rounded-full pill button overlaid in the center of the orb containing:
  - A mic icon (dark) + "Call AI Agent" text when disconnected
  - "End Call" text with MicOff icon when connected
  - Clicking triggers start/stop conversation

- **Status Text**: Small text below the orb showing "Listening..." or "Agent is speaking..." when connected

## CSS Changes (index.css or tailwind config)

- Add a `@keyframes spin` animation (360deg rotation) for the orb background
- Add a glow effect using `box-shadow` with the primary gold color
- Add the conic-gradient utility class

## Technical Details

- All ElevenLabs integration logic (useConversation, startSession, endSession) stays identical
- The orb uses a wrapper div with `overflow-hidden rounded-full` and a rotating inner div with conic-gradient
- Framer-motion handles the pulse/scale when speaking
- The pill button is absolutely positioned in the center of the orb

## Files Modified

1. **src/components/ChatWindow.tsx** -- Complete visual redesign to glowing spinning orb with center pill button
2. **src/pages/Index.tsx** -- Restructure to single-column centered layout with orb on top, text below
3. **src/index.css** -- Add spin keyframe and glow utilities

