

# Inline Voice Conversation UI

Replace the floating widget with a prominent, always-visible voice conversation panel embedded directly in the hero section of the landing page.

## What Changes

**Layout Redesign**: The hero section will be split into two columns on desktop -- text/headline on the left, and the voice conversation UI on the right. On mobile, the conversation panel will appear below the hero text.

**ChatWindow Component**: Remove the floating button, open/close state, and popup panel. Instead, render a standalone card with:
- The status orb (mic icon with speaking/listening animation)
- Status text and prompts
- Start/Stop conversation button
- Always visible, no toggle needed

**Index Page**: 
- Remove the "Talk to Our Assistant" button (since the UI is right there)
- Restructure the hero into a two-column grid: left side = headline + description, right side = conversation card
- Remove the `<ChatWindow />` from the bottom of the page

## Files Modified

1. **src/components/ChatWindow.tsx** -- Strip out floating button, AnimatePresence, open/close logic. Export a static card component with the orb, status, and start/stop buttons.

2. **src/pages/Index.tsx** -- Restructure hero section into a responsive two-column layout. Embed `<ChatWindow />` inline in the right column instead of as a floating overlay.

## Technical Details

- The `useConversation` hook and ElevenLabs integration remain identical
- The card will use the existing dark theme styling (border-border, bg-card, etc.)
- Framer Motion animations on the orb are preserved
- Responsive: `md:grid-cols-2` grid in the hero, stacking on mobile

