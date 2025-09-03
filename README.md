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

