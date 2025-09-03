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

# Chatting

A TypeScript-based experimental project for working with AI APIs, featuring conversational AI, demographic simulations, and image generation capabilities.

## Overview

This project provides a collection of tools for experimenting with OpenAI's APIs:

- **Chat Module**: A conversational AI system that maintains context across multiple chat sessions using JSON file storage
- **Demographics Module**: A population simulation model with data visualization capabilities
- **Pictures Module**: A DALL-E integration for generating images from text prompts

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **AI Integration**: OpenAI API (GPT models and DALL-E)
- **Data Storage**: JSON files for conversation history and simulation data
- **Visualization**: HTML/JavaScript for demographic data charts
- **Dependencies**: dotenv, openai, node-fetch

## Requirements

- Node.js (version 16 or higher)
- OpenAI API key
- TypeScript compiler

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bmordue/chatting.git
   cd chatting
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your OpenAI API key:
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Chat Module

The chat module enables conversational AI with persistent context stored in JSON files.

1. Use `chats/messages.json` as a template for creating new conversations
2. Add your prompt as a message with `role: "user"` in the JSON file
3. Run the chat processor:
   ```bash
   npm start
   ```

The system will process all JSON files in the `chats/` directory where the latest message is a user prompt, generating AI responses and updating the files with the conversation history.

### Demographics Module

A population simulation model that generates demographic data and visualizations.

1. Run the simulation:
   ```bash
   node built/demographics/sim.js
   ```

2. Start a local server to view results:
   ```bash
   python -m http.server
   ```

3. Open your browser to: `http://localhost:8000/barchart.html`

### Pictures Module

Generate images using DALL-E with customizable parameters.

1. Create a parameters file (e.g., `image-params.json`):
   ```json
   {
     "prompt": "A serene landscape with mountains and a lake",
     "n": 1,
     "size": "256x256",
     "response_format": "b64_json"
   }
   ```

2. Generate images:
   ```bash
   node built/pictures/pictures.js image-params.json
   ```

Generated images will be saved as PNG files in the same directory as your parameters file.

## Project Structure

```
chatting/
├── chat/           # Conversational AI module
├── chats/          # JSON conversation files
├── demographics/   # Population simulation module
├── pictures/       # Image generation module
├── docs/           # Documentation files
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Contributing

This is an experimental project for learning and exploring AI APIs. Feel free to fork and experiment with your own modifications.

## License

This project is provided as-is for educational and experimental purposes.


