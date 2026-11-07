// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The docs are served by the gateway's Caddy at https://<gateway domain>/docs/,
// so every page lives under the /docs base path. See AGENTS.md before changing it.
export default defineConfig({
	site: 'https://javarouters.talentadigitalkudus.id',
	base: '/docs',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'JavaRouters Docs',
			description:
				'Dokumentasi JavaRouters: satu API key untuk Claude, GPT, Gemini, DeepSeek dan model AI lain lewat endpoint yang kompatibel dengan OpenAI dan Anthropic.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Bahasa Indonesia', lang: 'id' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/BIGBANG-69/javarouters' },
			],
			customCss: ['./src/styles/theme.css'],
			lastUpdated: true,
			sidebar: [
				{
					label: 'Mulai',
					items: [
						{ label: 'Pengenalan', slug: 'mulai/pengenalan' },
						{ label: 'Mulai cepat', slug: 'mulai/mulai-cepat' },
					],
				},
				{
					label: 'API',
					items: [
						{ label: 'Base URL dan autentikasi', slug: 'api/base-url-autentikasi' },
						{ label: 'Chat Completions (OpenAI)', slug: 'api/chat-completions' },
						{ label: 'Messages (Anthropic)', slug: 'api/messages-anthropic' },
						{ label: 'Daftar model', slug: 'api/daftar-model' },
					],
				},
				{
					label: 'Integrasi',
					items: [
						{ label: 'Claude Code', slug: 'integrasi/claude-code' },
						{ label: 'Alat dan aplikasi lain', slug: 'integrasi/alat-lain' },
					],
				},
				{
					label: 'Akun',
					items: [{ label: 'Saldo dan harga', slug: 'akun/saldo-dan-harga' }],
				},
				{
					label: 'Bantuan',
					items: [
						{ label: 'Kode error', slug: 'bantuan/kode-error' },
						{ label: 'FAQ', slug: 'bantuan/faq' },
						{ label: 'Tentang dan lisensi', slug: 'bantuan/tentang' },
					],
				},
			],
		}),
	],
});
