import { HttpUrlEncodingCodec } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

export class JsonHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeKey(key: string): string {
    return super.encodeKey(key);
  }

  encodeValue(value: any): string {
    if (!value) {
      return super.encodeValue(value);
    }

    if (typeof value === 'object' || Array.isArray(value)) {
      return super.encodeValue(JSON.stringify(value));
    }

    return super.encodeValue(value);
  }

  decodeKey(key: string): string {
    return super.decodeKey(key);
  }

  decodeValue(value: string): any {
    const decodedValue = super.decodeKey(value);

    try {
      return JSON.parse(decodedValue);
    } catch (error) {
      return decodedValue;
    }
  }
}

export const DiEncodingCodecToken = new InjectionToken<HttpUrlEncodingCodec>(
  'DiEncodingCodec',
);

// new JsonHttpUrlEncodingCodec()
