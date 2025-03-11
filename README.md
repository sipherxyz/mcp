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

You can run commands directly from the root directory:

### Using npx

```bash
# Run the context-bank script
npx mcp-context-bank
```

### Using npm scripts

```bash
# Run the context-bank script
npm run context-bank
```

## Development

Each package has its own README with specific instructions.

- [context-bank](./context-bank/README.md) 