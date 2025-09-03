# Chatting - OpenAI API Utilities

A collection of TypeScript utilities for working with OpenAI APIs including chat completions, image generation, and data analysis.

## Architecture Overview

This project consists of four main modules:

- **`chat/`** - Chat completion utilities for building conversations with context
- **`demographics/`** - Population simulation and demographic modeling
- **`pictures/`** - DALL-E image generation utilities
- **`steam/`** - Steam API integration for game library analysis
- **`common/`** - Shared configuration and utilities

## Setup

### Prerequisites
- Node.js (18+ recommended)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   STEAM_API_KEY=your_steam_api_key_here  # Optional, for Steam features
   STEAM_USER_ID=your_steam_user_id_here  # Optional, for Steam features
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Chat Module

Processes JSON conversation files in the `chats/` directory. The script looks for files where the latest message is from a user and generates assistant responses.

```bash
npm start
```

Example conversation file (`chats/example.json`):
```json
[
  {
    "role": "user", 
    "content": "Hello, how are you?"
  }
]
```

### Demographics Module

Runs population simulations with configurable cohorts and demographics.

```bash
node built/demographics/sim.js
```

View results at: `http://localhost:8000/demographics/barchart.html` (requires local server)

### Pictures Module

Generate images using DALL-E from parameter files.

```bash
node built/pictures/pictures.js path/to/params.json
```

Example params file:
```json
{
  "prompt": "A flying cat with wings, in the style of a childrens book illustrator",
  "n": 1,
  "size": "256x256"
}
```

### Steam Module

Analyze Steam library and wishlist data.

```bash
node built/steam/library.js
```

## Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint on TypeScript files  
- `npm run lint:fix` - Auto-fix linting issues where possible
- `npm start` - Build and run the chat application

### Code Quality

This project uses:
- TypeScript for type safety
- ESLint for code quality and consistency
- Centralized configuration management
- Proper async/await patterns for better error handling

### Contributing

1. Follow the existing code style
2. Run linting before committing: `npm run lint`
3. Ensure all modules build successfully: `npm run build`
4. Update documentation for any new features

## File Structure

```
├── chat/           # Chat completion utilities
├── demographics/   # Population modeling
├── pictures/       # Image generation
├── steam/          # Steam API integration  
├── common/         # Shared configuration
├── chats/          # Conversation JSON files
├── docs/           # Documentation and HTML files
└── built/          # Compiled JavaScript output
```

