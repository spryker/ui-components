# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/spryker/ui-components/compare/%40spryker%2Factions.open-modal%401.0.1...%40spryker%2Factions.open-modal%402.0.0) (2026-08-27)

* Angular migration 22 (#700) ([183b6ee](https://github.com/spryker/ui-components/commit/183b6eed7bda2cf9f13d2eda45c438ac27904661)), closes [#700](https://github.com/spryker/ui-components/issues/700)

### BREAKING CHANGES

* ng-zorro-antd moves from dependencies to peerDependencies in 33
  packages -- consumers must install it themselves. 9 packages now require
  @angular/core >= 21.0.0 (modal, dropdown, actions.confirmation, actions.open-modal,
  actions.close-modal, actions.refresh-modal, table.feature.row-actions,
  unsaved-changes.guard.drawer, unsaved-changes.guard.navigation). 5 packages require
  ng-zorro-antd >= 20.4.0 (input, input.password, table.column.autocomplete,
  table.column.input, table.feature.search). @spryker/date-picker requires the consumer
  to provide an NzDateAdapter on ng-zorro-antd 22. @spryker/notification no longer
  exposes NotificationWrapperComponent.params. @spryker/table and @spryker/modal replace
  the removed Angular ComponentFactory types with the @spryker/utils shim.
  @spryker/styles no longer ships a usable standalone.css -- compile the theme yourself.

  * feat: packages


## [1.0.1](https://github.com/spryker/ui-components/compare/@spryker/actions.open-modal@0.1.0...@spryker/actions.open-modal@1.0.1) (2025-12-12)


### Bug Fixes

* angular version ([#691](https://github.com/spryker/ui-components/issues/691)) ([5e297f4](https://github.com/spryker/ui-components/commit/5e297f444fedb6b6505ec464f435819aeeb2b4dd))





## [1.0.1-next.0](https://github.com/spryker/ui-components/compare/@spryker/actions.open-modal@1.0.0...@spryker/actions.open-modal@1.0.1-next.0) (2025-10-13)


### Bug Fixes

* peers ([4aad909](https://github.com/spryker/ui-components/commit/4aad909b629f797c3b8b5e211d5b3a53d0e70d56))





# [1.0.0](https://github.com/spryker/ui-components/compare/@spryker/actions.open-modal@0.1.1-next.0...@spryker/actions.open-modal@1.0.0) (2025-10-13)

**Note:** Version bump only for package @spryker/actions.open-modal





## [0.1.1-next.0](http://172.31.0.22:9292/spryker-internal-ci/ui-components/compare/@spryker/actions.open-modal@0.1.0...@spryker/actions.open-modal@0.1.1-next.0) (2025-09-12)

**Note:** Version bump only for package @spryker/actions.open-modal





# 0.1.0 (2025-06-16)


### Features

* FRW-10393 introduced actions for modal ([#650](http://172.31.0.22:9292/spryker-internal-ci/ui-components/issues/650)) ([16c32fb](http://172.31.0.22:9292/spryker-internal-ci/ui-components/commits/16c32fbcf381a1bc5e32c1c6347dca8451e7ba52))
