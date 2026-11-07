// Read-only MCP server for the JavaRouters documentation.
//
// Transport: Streamable HTTP, stateless (a fresh server per request), JSON responses.
// Served on the VPS at https://javarouters.talentadigitalkudus.id/mcp through Caddy.
// Content comes from pages.json (built by scripts/build-ai-files.mjs) and is re-read when the
// file changes, so docs updates do not need a restart. See AGENTS.md "Docs MCP server".
import { readFileSync, statSync } from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

const PORT = Number(process.env.PORT ?? 3100);
const PAGES_PATH = process.env.PAGES_PATH ?? join(dirname(fileURLToPath(import.meta.url)), 'pages.json');
const MAX_BODY_BYTES = 64 * 1024;
const VERSION = '1.0.0';

type Page = {
	slug: string;
	section: string;
	title: string;
	description: string;
	url: string;
	content: string;
};

let cache: { mtimeMs: number; pages: Page[] } | undefined;

function loadPages(): Page[] {
	const { mtimeMs } = statSync(PAGES_PATH);
	if (!cache || cache.mtimeMs !== mtimeMs) {
		const data = JSON.parse(readFileSync(PAGES_PATH, 'utf8')) as { pages: Page[] };
		cache = { mtimeMs, pages: data.pages };
	}
	return cache.pages;
}

// Accepts a slug ("api/chat-completions"), a docs path, or a full docs URL.
function findPage(pages: Page[], ref: string): Page | undefined {
	const slug = ref
		.trim()
		.replace(/^https?:\/\/[^/]+/, '')
		.replace(/^\/?docs\//, '')
		.replace(/^\/+|\/+$/g, '')
		.toLowerCase();
	return pages.find((p) => p.slug === slug);
}

function searchPages(pages: Page[], query: string, limit: number) {
	const terms = [...new Set(query.toLowerCase().split(/[^\p{L}\p{N}_.-]+/u).filter((t) => t.length > 1))];
	if (terms.length === 0) return [];
	const count = (text: string, term: string) => text.split(term).length - 1;
	return pages
		.map((page) => {
			const title = page.title.toLowerCase();
			const description = page.description.toLowerCase();
			const content = page.content.toLowerCase();
			let score = 0;
			for (const term of terms) {
				score += count(title, term) * 8 + count(description, term) * 4 + Math.min(count(content, term), 20);
			}
			const firstHit = Math.min(...terms.map((t) => content.indexOf(t)).filter((i) => i >= 0));
			const start = Number.isFinite(firstHit) ? Math.max(0, firstHit - 120) : 0;
			const snippet = page.content.slice(start, start + 320).replace(/\s+/g, ' ').trim();
			return { page, score, snippet };
		})
		.filter((hit) => hit.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);
}

const LANGUAGE_PAGES: Record<string, string> = {
	python: 'sdk/python',
	javascript: 'sdk/javascript',
	typescript: 'sdk/javascript',
	node: 'sdk/javascript',
	go: 'sdk/go',
	php: 'sdk/php',
	java: 'sdk/java',
	csharp: 'sdk/csharp',
	curl: 'sdk/http',
	http: 'sdk/http',
};

const INSTRUCTIONS = `Documentation for JavaRouters, an AI API gateway (one API key for Claude, GPT, Gemini, DeepSeek and more).
Use these tools to answer questions about the JavaRouters API and to write integration code.
Key facts:
- OpenAI-compatible base URL: https://javarouters.talentadigitalkudus.id/v1 (POST /chat/completions works for every model).
- Anthropic-compatible base URL: https://javarouters.talentadigitalkudus.id (no /v1; POST /v1/messages).
- Auth: "Authorization: Bearer <API key>" (Anthropic format also accepts "x-api-key").
- Model names change; never hard-code a list. Read them from GET /v1/models or https://javarouters.talentadigitalkudus.id/pricing.
- Read the API key from the JAVAROUTERS_API_KEY environment variable in generated code; never embed it.
Pages are written in Indonesian. Start with search_docs or get_integration_example, then get_doc_page for full detail.`;

function text(value: string) {
	return { content: [{ type: 'text' as const, text: value }] };
}

function buildServer(): McpServer {
	const server = new McpServer({ name: 'javarouters-docs', version: VERSION }, { instructions: INSTRUCTIONS });
	const readOnly = { readOnlyHint: true, openWorldHint: false };

	server.registerTool(
		'list_doc_pages',
		{
			title: 'List documentation pages',
			description: 'List every JavaRouters documentation page with its slug, section, title and description.',
			annotations: readOnly,
		},
		async () => {
			const lines = loadPages().map((p) => `- ${p.slug} [${p.section}] ${p.title}: ${p.description}`);
			return text(lines.join('\n'));
		},
	);

	server.registerTool(
		'search_docs',
		{
			title: 'Search documentation',
			description:
				'Keyword search over the JavaRouters docs (Indonesian and English terms both work, e.g. "streaming", "error 403", "php"). Returns the best matching pages with a snippet.',
			inputSchema: {
				query: z.string().min(1).max(200).describe('Search keywords'),
				limit: z.number().int().min(1).max(10).optional().describe('Maximum results, default 5'),
			},
			annotations: readOnly,
		},
		async ({ query, limit }) => {
			const hits = searchPages(loadPages(), query, limit ?? 5);
			if (hits.length === 0) {
				return text(`No pages matched "${query}". Call list_doc_pages to see every page.`);
			}
			const out = hits.map(
				({ page, snippet }) => `## ${page.title}\nslug: ${page.slug}\nurl: ${page.url}\n${page.description}\n…${snippet}…`,
			);
			return text(out.join('\n\n'));
		},
	);

	server.registerTool(
		'get_doc_page',
		{
			title: 'Read a documentation page',
			description: 'Return the full Markdown of one documentation page, by slug (e.g. "api/chat-completions") or docs URL.',
			inputSchema: {
				slug: z.string().min(1).max(300).describe('Page slug or full docs URL'),
			},
			annotations: readOnly,
		},
		async ({ slug }) => {
			const pages = loadPages();
			const page = findPage(pages, slug);
			if (!page) {
				return {
					...text(`Unknown page "${slug}". Valid slugs:\n${pages.map((p) => p.slug).join('\n')}`),
					isError: true,
				};
			}
			return text(`# ${page.title}\nURL: ${page.url}\n\n${page.content}`);
		},
	);

	server.registerTool(
		'get_integration_example',
		{
			title: 'Integration guide for a language',
			description:
				'Return the full JavaRouters integration guide (install, configuration, request, streaming) for one programming language.',
			inputSchema: {
				language: z
					.enum(['python', 'javascript', 'typescript', 'node', 'go', 'php', 'java', 'csharp', 'curl', 'http'])
					.describe('Programming language; use "http" for any other language'),
			},
			annotations: readOnly,
		},
		async ({ language }) => {
			const page = findPage(loadPages(), LANGUAGE_PAGES[language]);
			if (!page) return { ...text(`No guide found for ${language}.`), isError: true };
			return text(`# ${page.title}\nURL: ${page.url}\n\n${page.content}`);
		},
	);

	return server;
}

function sendJson(res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}) {
	res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
	res.end(JSON.stringify(body));
}

function rpcError(res: ServerResponse, status: number, message: string, headers: Record<string, string> = {}) {
	sendJson(res, status, { jsonrpc: '2.0', error: { code: -32000, message }, id: null }, headers);
}

async function readBody(req: IncomingMessage): Promise<string> {
	let size = 0;
	const chunks: Buffer[] = [];
	for await (const chunk of req) {
		size += chunk.length;
		if (size > MAX_BODY_BYTES) throw new Error('too_large');
		chunks.push(chunk);
	}
	return Buffer.concat(chunks).toString('utf8');
}

const httpServer = createServer(async (req, res) => {
	// Public read-only content: allow browser-based MCP clients (e.g. MCP Inspector).
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

	const path = new URL(req.url ?? '/', 'http://localhost').pathname.replace(/\/+$/, '');

	if (path === '/health') {
		try {
			return sendJson(res, 200, { status: 'ok', version: VERSION, pages: loadPages().length });
		} catch {
			return sendJson(res, 503, { status: 'pages_unavailable' });
		}
	}
	if (path !== '/mcp') return sendJson(res, 404, { error: 'not_found' });
	if (req.method === 'OPTIONS') {
		res.writeHead(204);
		return res.end();
	}
	if (req.method !== 'POST') return rpcError(res, 405, 'Method not allowed. Use POST.', { Allow: 'POST, OPTIONS' });

	let body: unknown;
	try {
		body = JSON.parse(await readBody(req));
	} catch (err) {
		const tooLarge = err instanceof Error && err.message === 'too_large';
		return rpcError(res, tooLarge ? 413 : 400, tooLarge ? 'Request body too large.' : 'Invalid JSON.');
	}

	const server = buildServer();
	const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
	res.on('close', () => {
		void transport.close();
		void server.close();
	});
	try {
		await server.connect(transport);
		await transport.handleRequest(req, res, body);
	} catch (err) {
		console.error('mcp request failed', err);
		if (!res.headersSent) rpcError(res, 500, 'Internal server error.');
	}
});

httpServer.listen(PORT, () => {
	console.log(`javarouters-docs MCP ${VERSION} listening on :${PORT} (pages: ${PAGES_PATH})`);
});
