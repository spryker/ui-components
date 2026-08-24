/**
 * Storybook test-runner configuration — Angular 20.3 → 22 migration pixel baseline (phase 1).
 *
 * One PNG per named CSF export, written to `.pixel-baseline/` (see `PIXEL_BASELINE_DIR`).
 *
 * The capture is scoped to the rendered component root, never to the page. Storybook's own
 * chrome — the `#storybook-root` layout padding, the preview background, the highlight layer,
 * the `<storybook-root>` Angular bootstrap element — sits outside the clip, so upgrading
 * Storybook in a later phase cannot produce mass false diffs.
 *
 * The runner itself lives in `tools/pixel-baseline`, not in the root `node_modules`; see that
 * package's `description` for why. Nothing here may `require('@storybook/test-runner')`.
 *
 * Nothing is skipped silently: a story whose component root cannot be measured throws, so the
 * runner reports it by name instead of leaving a hole in the visual gate.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = process.env.PIXEL_BASELINE_DIR
    ? path.resolve(process.env.PIXEL_BASELINE_DIR)
    : path.resolve(__dirname, '..', '.pixel-baseline');

const VIEWPORT = { width: 1280, height: 800 };

/** Frozen wall clock for every capture. Arbitrary, but it must never change between phases. */
const FIXED_CLOCK = new Date('2024-06-15T12:00:00.000Z');

/** Seed for the deterministic `Math.random` replacement. Must never change between phases. */
const RANDOM_SEED = 20220422;

/** Marker id of the injected reset stylesheet, so re-injection per story is a no-op. */
const RESET_STYLE_ID = '__pixel_baseline_reset__';

/**
 * Collapse every CSS animation and transition to its settled end state rather than removing it.
 * `animation: none` would strip ant-design's enter animations too, leaving elements stuck at the
 * `opacity: 0` their base class declares; a zero duration with a negative delay jumps straight to
 * the final frame instead.
 */
const RESET_CSS = [
    '*, *::before, *::after {',
    '    animation-delay: -1ms !important;',
    '    animation-duration: 1ms !important;',
    '    animation-iteration-count: 1 !important;',
    '    transition-delay: 0s !important;',
    '    transition-duration: 0s !important;',
    '    caret-color: transparent !important;',
    '    scroll-behavior: auto !important;',
    '}',
].join('\n');

/**
 * Elements Storybook's Angular renderer inserts between `#storybook-root` and the story output.
 * They are scaffolding, not component output, so the capture descends through them.
 */
const SCAFFOLDING_TAGS = ['STORYBOOK-ROOT', 'STORYBOOK-WRAPPER', 'SB-WRAPPER'];

/** `CustomElementOptions.prefix` in libs/web-components — the tag prefix of every custom element. */
const CUSTOM_ELEMENT_PREFIX = 'web-';

const MEASURE_ARGS = { scaffoldingTags: SCAFFOLDING_TAGS, customElementPrefix: CUSTOM_ELEMENT_PREFIX };

/** How long to keep waiting for the rendered box to stop moving, and how still it has to be. */
const SETTLE_POLL_MS = 100;
const SETTLE_STABLE_POLLS = 4;
const SETTLE_TIMEOUT_MS = 30000;

/**
 * How long to hold out for an empty `web-` element to fill in. Some stories nest `web-` tags that
 * are declarative configuration and never render children of their own (`<web-spy-radio>` inside a
 * radio group, `<web-spy-tab>` inside tabs), so this cannot be waited on until the full deadline —
 * that would cost 30s per such story. Real upgrades land in ~2.5s.
 */
const WEB_COMPONENT_TIMEOUT_MS = 8000;

/**
 * Runs in the browser. Finds the story's own root element and returns the union of every
 * non-empty box in its subtree, in document coordinates.
 *
 * The union — rather than the root's own `getBoundingClientRect()` — is what makes this correct
 * for inline wrappers: a `<spy-story>` host is an inline box 18px tall whose `<spy-button>` child
 * is 42px tall and overflows it, and an element screenshot of the host would cut the button in half.
 */
const measureComponentRoot = ({ scaffoldingTags, customElementPrefix }) => {
    const container = document.querySelector('#storybook-root') || document.querySelector('#root');

    if (!container) {
        return { error: 'no #storybook-root element in the preview iframe' };
    }

    // Step inside the Storybook container, then through the renderer's scaffolding, so the clip
    // starts at the story's own root element.
    let root = container;

    while (root.children.length === 1 && (root === container || scaffoldingTags.includes(root.tagName))) {
        root = root.children[0];
    }

    const scope = root === container ? Array.from(container.children) : [root];

    // CDK renders overlays into `document.body`, outside the component root. Include the panes
    // (not the full-viewport backdrop) so an open modal, drawer or dropdown is still covered.
    const panes = Array.from(document.querySelectorAll('.cdk-overlay-container .cdk-overlay-pane'));
    // ngx-toastr does not use the CDK overlay. It builds its own `div.overlay-container` on
    // `<body>` and appends a `#toast-container` pane per position class, so every toast falls
    // outside the selector above and the whole floating notification layer would go uncaptured.
    // An empty container is a zero-width fixed box and contributes nothing, so this is inert for
    // the stories that open no toast.
    const toastPanes = Array.from(document.querySelectorAll('.overlay-container #toast-container'));
    const bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    let measured = 0;

    const visit = (element) => {
        const rect = element.getBoundingClientRect();

        if (rect.width > 0 && rect.height > 0) {
            bounds.left = Math.min(bounds.left, rect.left);
            bounds.top = Math.min(bounds.top, rect.top);
            bounds.right = Math.max(bounds.right, rect.right);
            bounds.bottom = Math.max(bounds.bottom, rect.bottom);
            measured++;
        }

        for (const child of element.children) {
            visit(child);
        }
    };

    scope.concat(panes, toastPanes).forEach(visit);

    if (measured === 0) {
        return {
            error: 'the component root and its subtree have no element with a non-zero box',
            rootTag: root === container ? '(empty #storybook-root)' : root.tagName,
            html: container.innerHTML.slice(0, 400),
        };
    }

    const left = Math.max(0, Math.floor(bounds.left + window.scrollX));
    const top = Math.max(0, Math.floor(bounds.top + window.scrollY));

    return {
        rootTag: root === container ? '#storybook-root children' : root.tagName,
        elements: measured,
        // `libs/web-components` renders its custom elements late, and `networkidle` is long past by
        // then: `createCustomElementForLazy` waits on `whenBoundaryExist(el, timeoutMs = 1000)`
        // before it dynamically imports the component. Until that resolves, `<web-spy-button>` is
        // an empty inline box of unstyled text, and a capture taken then is a baseline of nothing.
        //
        // `:defined` alone is no use as a gate — it is true from the first frame here, and false
        // forever for every Angular component host (`<spy-button>` is a selector, not a custom
        // element). An empty `web-` prefixed element is the signal that content is still coming.
        pendingWebComponents: Array.from(container.getElementsByTagName('*')).filter(
            (element) =>
                element.localName.startsWith(customElementPrefix) &&
                (!element.matches(':defined') || element.childElementCount === 0),
        ).length,
        clip: {
            x: left,
            y: top,
            width: Math.ceil(bounds.right + window.scrollX) - left,
            height: Math.ceil(bounds.bottom + window.scrollY) - top,
        },
    };
};

module.exports = {
    // Every story in this repo carries the `test` tag; state it rather than relying on the default.
    tags: {
        include: ['test'],
    },

    async setup() {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    },

    async preVisit(page) {
        await page.setViewportSize(VIEWPORT);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        // ngx-toastr mounts `div.overlay-container > #toast-container` on `<body>`, OUTSIDE
        // `#storybook-root`, so it is not part of the story's Angular application and Storybook's
        // per-story teardown never removes it. A toast that outlives its story therefore leaks
        // into the next one: it lands in the following capture's clip (the union includes
        // `#toast-container`) and, when its own code next runs, reaches into the destroyed
        // injector and throws NG0205 — which fails that story and writes a screenshot of
        // Storybook's error page instead of the component.
        //
        // Three fixes were tried at the source and all three failed, measured: closing before
        // teardown in `NotificationComponent.ngOnDestroy`, `easeTime: 0` to make the removal
        // synchronous, and reverting the story to a self-dismissing `timeOut`. None removes the
        // stranded node, because by then nothing owns it.
        //
        // So the harness guarantees isolation instead: every story starts with no leftover
        // overlay container. This runs BEFORE the story renders, so it can only remove a
        // previous story's residue — never the toast the current story opens. It deliberately
        // does NOT paper over the underlying product defect, which is recorded in backlog.md:
        // a consumer destroying a floating `spy-notification` still leaks a toast into <body>.
        await page.evaluate(() => {
            document.querySelectorAll('.overlay-container, #toast-container').forEach((node) => node.remove());
        });
        // `libs/locale`'s stories render `Date.now()`. Without a frozen clock their baseline
        // changes every minute, which is indistinguishable from a migration regression.
        await page.clock.setFixedTime(FIXED_CLOCK);
        // Same problem, different source: table-column-chip's story builds its rows with
        // `Math.random()`. Seeding here rather than editing the story keeps phase 1 free of
        // library-source changes. This runs before the story renders, so it is the value the
        // story module sees when Storybook lazily imports its chunk.
        await page.evaluate((seed) => {
            let state = seed;

            // mulberry32 — small, fast, and identical across browsers and runs.
            Math.random = () => {
                state = (state + 0x6d2b79f5) | 0;

                let t = Math.imul(state ^ (state >>> 15), 1 | state);

                t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }, RANDOM_SEED);
        await page.evaluate(
            ({ css, id }) => {
                if (document.getElementById(id)) {
                    return;
                }

                const style = document.createElement('style');

                style.id = id;
                style.textContent = css;
                document.head.appendChild(style);
            },
            { css: RESET_CSS, id: RESET_STYLE_ID },
        );
    },

    async postVisit(page, context) {
        // Fonts, `load` and network idle. This is @storybook/test-runner's own `waitForPageReady`,
        // inlined because this file cannot require the runner (see the header).
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('load');
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);

        await page.evaluate(async () => {
            const pending = Array.from(document.images)
                .filter((image) => !image.complete)
                .map(
                    (image) =>
                        new Promise((resolve) => {
                            image.addEventListener('load', resolve, { once: true });
                            image.addEventListener('error', resolve, { once: true });
                        }),
                );

            await Promise.all(pending);
        });

        // `networkidle` is not "settled": `libs/web-components` upgrades its custom elements after
        // it, and the box jumps from unstyled text to the real component. Wait for the measured
        // union to stop changing rather than for a fixed sleep, which is either racy or slow.
        const start = Date.now();
        const deadline = start + SETTLE_TIMEOUT_MS;
        let measurement = await page.evaluate(measureComponentRoot, MEASURE_ARGS);
        let previous = JSON.stringify(measurement.clip);
        let stable = 1;
        let settled = false;

        while (!settled && Date.now() < deadline) {
            await page.waitForTimeout(SETTLE_POLL_MS);
            // Re-awaited every poll, not once: the webfont is requested by the lazily loaded
            // component, so `document.fonts.ready` resolves early and then the swap resizes text.
            await page.evaluate(() => document.fonts.ready);

            measurement = await page.evaluate(measureComponentRoot, MEASURE_ARGS);

            const current = JSON.stringify(measurement.clip);

            stable = current === previous ? stable + 1 : 1;
            previous = current;
            // An errored measurement is never "settled": a story that has rendered nothing yet
            // holds a steady zero box, and treating that as stable is how a slow story (an ajax
            // form waiting on a request, a lazy web component) silently loses its baseline image.
            settled =
                !measurement.error &&
                stable >= SETTLE_STABLE_POLLS &&
                (!measurement.pendingWebComponents || Date.now() - start > WEB_COMPONENT_TIMEOUT_MS);
        }

        await page.evaluate(async () => {
            // Web Animations (Angular's own animation engine, and ng-zorro's Angular-driven ones)
            // ignore the CSS reset above, so drive each one to its end state explicitly.
            for (const animation of document.getAnimations()) {
                try {
                    animation.finish();
                } catch {
                    try {
                        animation.pause();
                    } catch {
                        /* an unfinishable animation is not worth failing a capture over */
                    }
                }
            }

            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });

        measurement = await page.evaluate(measureComponentRoot, MEASURE_ARGS);

        if (measurement.error) {
            throw new Error(
                `pixel baseline: cannot capture "${context.id}" (${context.title} / ${context.name}) — ` +
                    `${measurement.error}. Root: ${measurement.rootTag || 'n/a'}. ` +
                    `Markup: ${measurement.html || 'n/a'}`,
            );
        }

        const file = path.join(OUTPUT_DIR, `${context.id}.png`);

        await page.screenshot({ path: file, fullPage: true, clip: measurement.clip, animations: 'disabled' });

        fs.writeFileSync(
            path.join(OUTPUT_DIR, `${context.id}.json`),
            `${JSON.stringify(
                {
                    id: context.id,
                    title: context.title,
                    name: context.name,
                    rootTag: measurement.rootTag,
                    elements: measurement.elements,
                    settled,
                    pendingWebComponents: measurement.pendingWebComponents,
                    clip: measurement.clip,
                    viewport: VIEWPORT,
                },
                null,
                4,
            )}\n`,
        );

        // Flush pending toast timers WHILE THIS STORY'S APPLICATION IS STILL ALIVE.
        //
        // Removing the stranded `div.overlay-container` in `preVisit` stops a leaked toast
        // contaminating the next capture's clip, but it cannot cancel the dismiss timer ngx-toastr
        // already scheduled. That timer fires during the NEXT story, by which point its own
        // injector is gone -> `NG0205: Injector has already been destroyed`, which fails that
        // story and writes a screenshot of Storybook's error page.
        //
        // The clock is frozen by `page.clock.setFixedTime` in `preVisit`, so those timers are
        // parked rather than running. Advancing it here, after the screenshot has been taken,
        // lets each toast complete its own dismissal against its own live application — which was
        // measured to be clean — and leaves nothing pending for the next story to inherit. It runs
        // after the capture, so it cannot affect any baseline.
        await page.clock.runFor(10000);
    },
};
