import puppeteer from 'puppeteer';

/**
 * Vite plugin: renders the dev server to a PDF (no margins, no headers/footers)
 * once on server start, then again on every HMR-triggering file change.
 *
 * @param {Object} opts
 * @param {string} opts.url        - dev server URL, e.g. 'http://localhost:5173'
 * @param {string} opts.out        - output PDF path, e.g. './out.pdf'
 * @param {number} [opts.debounceMs=300] - debounce window for bursty HMR events
 */



export function pdfSnapshotPlugin({ url, out, debounceMs = 300 }) {
	let browser;
	let timer;
	let rendering = false;
	let queuedRerun = false;

	async function render() {
		if (rendering) {
			queuedRerun = true;
			return;
		}
		rendering = true;
		try {
			browser ??= await puppeteer.launch();
			const page = await browser.newPage();
			try {
				await page.goto(url, { waitUntil: 'networkidle0' });
				await page.pdf({
					path: out,
					printBackground: true,
					preferCSSPageSize: true,
					margin: { top: '0', bottom: '0', left: '0', right: '0' },
					displayHeaderFooter: false
				});
				console.log(`[pdf-snapshot] wrote ${out}`);
			} finally {
				await page.close();
			}
		} catch (err) {
			console.error('[pdf-snapshot] failed:', err.message);
		} finally {
			rendering = false;
			if (queuedRerun) {
				queuedRerun = false;
				scheduleRender();
			}
		}
	}

	function scheduleRender() {
		clearTimeout(timer);
		timer = setTimeout(render, debounceMs);
	}

	return {
		name: 'pdf-snapshot',
		configureServer(server) {
			// initial render once the dev server is actually listening
			server.httpServer?.once('listening', () => scheduleRender());
		},
		handleHotUpdate() {
			// fires on any file change Vite's watcher picks up (css, svelte, js, ts...)
			scheduleRender();
		},
		async buildEnd() {
			if (browser) {
				await browser.close();
				browser = undefined;
			}
		}
	};
}
