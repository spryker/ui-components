import { HttpUrlEncodingCodec } from '@angular/common/http';

export class JsonHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeKey(key: string): string {
    return super.encodeKey(key);
  }

  encodeValue(value: any): string {
    if (!value) {
      return super.encodeValue(value);
    }

    if (typeof value === 'object' || Array.isArray(value)) {
      const encodedValue = JSON.stringify(value);

      return super.encodeValue(encodedValue);
    }

    return super.encodeValue(value);
  }

  decodeKey(key: string): string {
    return super.decodeKey(key);
  }

  decodeValue(value: string): any {
    const decodedValue = super.decodeKey(value);

    return JSON.parse(decodedValue) || decodedValue;
  }
}
