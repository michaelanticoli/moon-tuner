// Ambient declaration for `process.env` used inside MCP tool handlers.
// The tool files are bundled by @lovable.dev/mcp-js into a Deno Edge Function
// where `process.env` is polyfilled at runtime, but the TS build (Vite/tsc)
// evaluates them in a browser lib context. This keeps the types happy without
// pulling in @types/node.
declare const process: {
  env: Record<string, string | undefined>;
};
