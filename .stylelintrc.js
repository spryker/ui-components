module.exports = {
    extends: ['stylelint-config-standard-less', '@spryker/frontend-config.stylelint/.stylelintrc.json'],
    rules: {
        'no-empty-source': null,
        'selector-max-class': 4,
        'selector-max-compound-selectors': 4,
        'selector-max-combinators': 4,
        'selector-class-pattern': null,
        'less/no-duplicate-variables': null,
        'less/color-no-invalid-hex': null,

        // Off on stylelint's own instruction, not to dodge findings: the 17.0.0 migration guide
        // tells LESS/SCSS users to disable these, because 17 resolves nesting per the CSS Nesting
        // spec and CSS nesting has no `&`-concatenation — so LESS's `&-suffix` reads as a type
        // selector. All 211 `selector-no-qualifying-type` reports named `-nav`/`--primary`-style
        // names that never ship as type selectors in the compiled CSS.
        //
        // Do NOT "fix" the specificity orderings by hoisting: libs/table.feature.settings nests
        // `&:hover` inside `&--disabled` at equal specificity, so source order is load-bearing and
        // reordering makes a disabled reset button highlight on hover. Details in
        // docs/ng22-migration/backlog.md.
        'selector-no-qualifying-type': null,
        'no-descending-specificity': null,
    },
};
