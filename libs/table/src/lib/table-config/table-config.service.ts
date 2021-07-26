import { Injectable } from '@angular/core';
import { mergeDeep } from '@spryker/utils';

import { TableConfig } from '../table/table';
import { TableDefaultConfig } from './table-config-default';

@Injectable({ providedIn: 'root' })
export class TableConfigService {
  private knownProperties: {
    [P in keyof TableConfig]-?: any;
  } = {
    columns: true,
    columnsUrl: true,
    dataSource: true,
  };

  constructor(private defaultConfig: TableDefaultConfig) {}

  normalize(config?: TableConfig): TableConfig {
    if (!config) {
      throw new Error(`TableConfigService: Config is not defined!`);
    }

    config = this.applyDefaults(config);
    this.normalizeFeatures(config);

    return config;
  }

  getKnownKeys(config: TableConfig): string[] {
    return Object.keys(config).filter((key) => key in this.knownProperties);
  }

  getFeatureKeys(config: TableConfig): string[] {
    return Object.keys(config).filter(
      (key) => key in this.knownProperties === false,
    );
  }

  private applyDefaults(config: TableConfig): TableConfig {
    return mergeDeep(this.defaultConfig, config);
  }

  private normalizeFeatures(config: TableConfig): void {
    this.getFeatureKeys(config).forEach((key) => {
      if (!config[key] || typeof config[key] !== 'object') {
        config[key] = {};
      }
    });
  }
}
