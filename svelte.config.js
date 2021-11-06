import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({}),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter

    adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),

		// disable SSR
		ssr: false,
		// disable Prerendering
		prerender: { enabled: true },

		// hydrate the element in src/app.html
		target: 'body',

		vite: () => ({})
	}
};

export default config;
