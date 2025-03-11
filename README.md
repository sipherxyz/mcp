# MCP Monorepo

This is a monorepo for Model Context Protocol (MCP) related projects.

## Projects

- **context-bank**: A context provider for MCP.

## Setup

```bash
# Install dependencies for all workspaces
npm install

# Build all packages
npm run build
```

## Running commands

You can run commands in several ways:

### Locally using npx

```bash
# Run the context-bank script
npx mcp-context-bank
```

### Locally using npm scripts

```bash
# Run the context-bank script
npm run context-bank
```

### Directly from GitHub

You can run the package directly from GitHub using npx:

```bash
# Run with environment variables
env ONYX_API_BASE=http://your-api-url ONYX_API_KEY=your-api-key npx -y https://github.com/sipherxyz/mcp --force
```

#### Environment Variables

The following environment variables can be configured:

- `ONYX_API_BASE`: The base URL of your API (required)
- `ONYX_API_KEY`: Your API key (optional depending on your setup)
- `LOG_LEVEL`: Logging level (default: "info", options: "debug", "info", "error")

## Development

Each package has its own README with specific instructions.

- [context-bank](./context-bank/README.md)

## Structure

This monorepo is set up with workspaces to manage multiple related packages. The main package includes dependencies required for running via npx directly from GitHub.

## Requirements

- Node.js 16.0.0 or later
- npm 7.0.0 or later 