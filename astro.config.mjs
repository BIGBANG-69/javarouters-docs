// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar.mjs';

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
			sidebar,
		}),
	],
});
