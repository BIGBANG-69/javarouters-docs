// Single source of truth for page order. Used by astro.config.mjs (site sidebar) and by
// scripts/build-ai-files.mjs (llms.txt, llms-full.txt and the MCP page index).
// Every page in src/content/docs/ must appear here exactly once.
export const sidebar = [
	{
		label: 'Mulai',
		items: [
			{ label: 'Pengenalan', slug: 'mulai/pengenalan' },
			{ label: 'Mulai cepat', slug: 'mulai/mulai-cepat' },
		],
	},
	{
		label: 'Alat coding AI',
		items: [
			{ label: 'Claude Code', slug: 'integrasi/claude-code' },
			{ label: 'Codex', slug: 'integrasi/codex' },
			{ label: 'OpenCode', slug: 'integrasi/opencode' },
			{ label: 'Cline, Cursor, Aider dan lainnya', slug: 'integrasi/alat-lain' },
		],
	},
	{
		label: 'Referensi API',
		items: [
			{ label: 'Ringkasan API', slug: 'api/ringkasan' },
			{ label: 'Chat Completions', slug: 'api/chat-completions' },
			{ label: 'Messages (Anthropic)', slug: 'api/messages-anthropic' },
			{ label: 'Daftar model', slug: 'api/daftar-model' },
			{ label: 'Saldo dan pemakaian key', slug: 'api/saldo-key' },
			{ label: 'Kode error', slug: 'api/kode-error' },
		],
	},
	{
		label: 'Panduan',
		items: [
			{ label: 'Streaming', slug: 'panduan/streaming' },
			{ label: 'Tool calling', slug: 'panduan/tool-calling' },
			{ label: 'Retry dan penanganan error', slug: 'panduan/retry' },
		],
	},
	{
		label: 'SDK dan bahasa',
		items: [
			{ label: 'Python', slug: 'sdk/python' },
			{ label: 'JavaScript / TypeScript', slug: 'sdk/javascript' },
			{ label: 'Go', slug: 'sdk/go' },
			{ label: 'PHP', slug: 'sdk/php' },
			{ label: 'Java', slug: 'sdk/java' },
			{ label: 'C# / .NET', slug: 'sdk/csharp' },
			{ label: 'HTTP (bahasa lain)', slug: 'sdk/http' },
		],
	},
	{
		label: 'Integrasi',
		items: [{ label: 'MCP dokumentasi untuk AI', slug: 'integrasi/mcp' }],
	},
	{
		label: 'Akun',
		items: [{ label: 'Saldo dan harga', slug: 'akun/saldo-dan-harga' }],
	},
	{
		label: 'Bantuan',
		items: [
			{ label: 'FAQ', slug: 'bantuan/faq' },
			{ label: 'Tentang dan lisensi', slug: 'bantuan/tentang' },
		],
	},
];
