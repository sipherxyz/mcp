# Context Bank MCP

## Overview

Context Bank MCP is a project using the Model Context Protocol (MCP) to create an interface for querying the AtherOS knowledge base through an API. This project builds an MCP server capable of interacting with the Onyx API to create chat sessions and send queries to the knowledge base.

## Features

- Query the knowledge base in AtherOS
- Format and display results from the Onyx API

## Technologies Used

- TypeScript
- Node.js
- Model Context Protocol (MCP) SDK
- Zod for data validation
- Axios for HTTP requests

## Installation

### Local Installation

```bash
# Install dependencies
npm install

# Compile source code
npm run build
```

### Direct Installation from GitHub

You can run this package directly from GitHub without local installation:

```bash
# Run with environment variables
env ONYX_API_BASE=http://your-api-url ONYX_API_KEY=your-api-key npx -y https://github.com/sipherxyz/mcp --force
```

## Configuration

The project uses environment variables to connect to the Onyx API. Follow these steps to configure your environment:

### Automatic Setup (Recommended)

Run the setup script to configure your environment interactively:

```bash
npm run setup
```

This script will:
1. Create a `.env` file if it doesn't exist
2. Prompt you for your AtherOS API key
3. Allow you to customize the API base URL
4. Set default values for other configuration options

### Manual Setup

1. Copy the example environment file to create your own:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your specific configuration:
```
# AtherOS API Configuration
ONYX_API_KEY=your_api_key_here
ONYX_API_BASE=http://your_api_base_url:port

# Optional: Logging Configuration
LOG_LEVEL=info
```

### Environment Variables

1. Required Environment Variables:
   - `ONYX_API_BASE`: Base URL for the AtherOS API (e.g., "http://localhost:3000")
   - `ONYX_API_KEY`: Your AtherOS API key (if required by your API endpoint)

2. Optional Environment Variables:
   - `LOG_LEVEL`: Logging level (info, debug, error) - defaults to "info"

## Usage

After compilation, you can use the command line tool in several ways:

### Local Usage After Installation

```bash
# Direct usage
./build/index.js

# Or through npm script
npm start
```

### Usage from Monorepo Root

```bash
# Using npx
npx mcp-context-bank

# Or using npm script (if defined)
npm run context-bank
```

### Direct Usage from GitHub

```bash
env ONYX_API_BASE=http://your-api-url ONYX_API_KEY=your-api-key npx -y https://github.com/sipherxyz/mcp --force
```

## API Tools

The project provides one main MCP tool:

### document-search

Searches for documents in the AtherOS knowledge base.

Parameters:
- `message`: The search query string to find relevant documents

The search is performed with the following default settings:
- Search type: semantic
- Result limit: 3 documents
- Deduplication: enabled
- Context: 1 chunk above and below the matching content

## Response Format

Responses from knowledge base queries include:
- Document content
- Document link
- Additional metadata (when available):
  - Document ID
  - Semantic identifier
  - Source type
  - Relevance score
  - Match highlights
  - Update timestamp

## Architecture

The project is organized with a simple structure:
- `src/index.ts`: Main entry point of the application, defines the MCP tools and connection logic
- Uses the stdio protocol to communicate with the MCP server

## Development

```bash
# Compile and view changes
npm run build

# Run in development mode
npm run dev
```

## Querying Methods in MCP

There are two main ways to query the AtherOS knowledge base through MCP:

### 1. Direct Document Search
```bash
query AtherOS "your search query here"
```
This method directly searches the AtherOS knowledge base for relevant documents matching your query. The search uses semantic matching to find the most relevant content.

### 2. Context Bank Command
```bash
use context bank search "your search query here"
```
This is an alternative syntax that performs the same document search operation. Both methods will return:
- Relevant document content
- Links to the source documents
- Additional metadata about the matches

The search is optimized with:
- Semantic search capabilities
- Document deduplication
- Contextual chunks (1 above and below matches)
- Top 3 most relevant results

## License

MIT License