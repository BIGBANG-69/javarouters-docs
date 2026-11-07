// Builds the machine-readable copies of the docs, after `astro build`:
//   dist/llms.txt        index of every page (https://llmstxt.org)
//   dist/llms-full.txt   every page in one Markdown file
//   mcp-dist/pages.json  page index read by the docs MCP server (mcp/server.ts)
// Page order comes from src/sidebar.mjs, the same list the site sidebar uses.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sidebar } from '../src/sidebar.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://javarouters.talentadigitalkudus.id';
const DOCS = `${SITE}/docs`;

function readPage(slug) {
	for (const ext of ['.md', '.mdx']) {
		const file = join(ROOT, 'src/content/docs', slug + ext);
		if (existsSync(file)) return readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
	}
	throw new Error(`Page in sidebar has no file: ${slug}`);
}

function parsePage(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match) throw new Error('Missing frontmatter');
	const meta = {};
	for (const line of match[1].split('\n')) {
		const [key, ...rest] = line.split(':');
		if (rest.length && /^[a-z]+$/.test(key)) meta[key] = rest.join(':').trim();
	}
	return { meta, body: raw.slice(match[0].length) };
}

// Turn MDX into plain Markdown an AI can read: drop component wrappers and imports,
// keep tab labels as headings, and make internal links absolute.
function toPlainMarkdown(body) {
	return body
		.split('\n')
		.filter((line) => !/^import .+ from .+;?$/.test(line.trim()))
		.filter((line) => !/^<\/?(Tabs|Steps|CardGrid)[^>]*>$/.test(line.trim()))
		.filter((line) => line.trim() !== '</TabItem>')
		.map((line) => {
			const tab = line.trim().match(/^<TabItem label="([^"]+)">$/);
			if (tab) return `**${tab[1]}**`;
			if (line.trim() === ':::note') return '**Catatan:**';
			if (line.trim() === ':::caution') return '**Perhatian:**';
			if (line.trim() === ':::') return '';
			return line;
		})
		.join('\n')
		.replace(/\]\(\/docs\//g, `](${DOCS}/`)
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

const pages = [];
for (const group of sidebar) {
	for (const item of group.items) {
		const { meta, body } = parsePage(readPage(item.slug));
		pages.push({
			slug: item.slug,
			section: group.label,
			title: meta.title ?? item.label,
			description: meta.description ?? '',
			url: `${DOCS}/${item.slug}/`,
			content: toPlainMarkdown(body),
		});
	}
}

const summary =
	'JavaRouters adalah gateway API AI: satu API key untuk banyak model AI (Claude, GPT, Gemini, DeepSeek, dan lainnya) ' +
	'lewat endpoint yang kompatibel dengan OpenAI (`/v1/chat/completions`) dan Anthropic (`/v1/messages`). ' +
	`Base URL OpenAI: ${SITE}/v1. Base URL Anthropic: ${SITE}. Dokumentasi berbahasa Indonesia.`;

const sections = [...new Set(pages.map((p) => p.section))];
const llms = [
	'# JavaRouters',
	'',
	`> ${summary}`,
	'',
	`Daftar model dan harga yang selalu terbaru: ${SITE}/pricing (atau GET ${SITE}/v1/models dengan API key).`,
	`MCP server dokumentasi (Streamable HTTP): ${SITE}/mcp`,
	'',
	...sections.flatMap((section) => [
		`## ${section}`,
		'',
		...pages.filter((p) => p.section === section).map((p) => `- [${p.title}](${p.url}): ${p.description}`),
		'',
	]),
	'## Optional',
	'',
	`- [Seluruh dokumentasi dalam satu file](${DOCS}/llms-full.txt)`,
	'',
].join('\n');

const full = [
	`# Dokumentasi JavaRouters`,
	'',
	`> ${summary}`,
	'',
	...pages.map((p) => [`---`, '', `# ${p.title}`, '', `URL: ${p.url}`, '', p.content, ''].join('\n')),
].join('\n');

writeFileSync(join(ROOT, 'dist/llms.txt'), llms);
writeFileSync(join(ROOT, 'dist/llms-full.txt'), full);
mkdirSync(join(ROOT, 'mcp-dist'), { recursive: true });
writeFileSync(
	join(ROOT, 'mcp-dist/pages.json'),
	JSON.stringify({ site: SITE, docs: DOCS, generated_at: new Date().toISOString(), pages }, null, 1),
);
console.log(`AI files: ${pages.length} pages -> dist/llms.txt, dist/llms-full.txt, mcp-dist/pages.json`);
