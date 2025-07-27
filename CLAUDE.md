# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Runs Vite dev server with hot reload
- **Build for production**: `npm run build` - Creates optimized production build
- **Build for development**: `npm run build:dev` - Creates development build
- **Lint code**: `npm run lint` - Runs ESLint on the codebase
- **Preview production build**: `npm run preview` - Serves the production build locally

## Architecture Overview

This is a React-based emoji collection and management application built with modern web technologies:

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Notion-inspired design tokens
- **Backend**: Supabase for data persistence
- **State Management**: React Query for server state, React hooks for local state
- **Routing**: React Router DOM

### Core Application Structure

**Main App Architecture** (`src/App.tsx`):
- Uses React Query for data fetching and caching
- Implements routing with React Router
- Provides global UI components (Toaster, Tooltip, etc.)

**Primary Page** (`src/pages/Index.tsx`):
- Manages emoji collection state and interactions
- Implements search and tag filtering functionality
- Seeds default emoji collection on first load
- Handles CRUD operations for emojis

**Data Layer** (`src/lib/supabase.ts`):
- `EmojiService` class provides all database operations
- Interfaces with Supabase for emoji storage
- Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables

### Key Components

**EmojiCard** (`src/components/EmojiCard.tsx`):
- Displays individual emojis with descriptions and tags
- Handles click-to-copy functionality using Clipboard API
- Provides dropdown menu for copy/delete actions

**UI Components** (`src/components/ui/`):
- Complete shadcn/ui component library
- Consistent design system with Notion-inspired styling
- Uses Radix UI primitives for accessibility

### Database Schema
The application expects a Supabase table named `emojis` with:
- `id` (string, primary key)
- `emoji` (string, the emoji character)
- `description` (string, optional description)
- `tags` (string array, for categorization)
- `created_at` and `updated_at` (timestamps)

### Design System
Uses custom CSS variables for Notion-inspired colors and spacing defined in `src/index.css` and Tailwind configuration.