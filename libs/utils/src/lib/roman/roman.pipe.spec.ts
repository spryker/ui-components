import { RomanPipe } from './roman.pipe';

describe('RomanPipe', () => {
  it('create an instance', () => {
    const pipe = new RomanPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return III', () => {
    const pipe = new RomanPipe();
    expect(pipe.transform(3)).toBe('III');
  });

  it('should return CCXLV', () => {
    const pipe = new RomanPipe();
    expect(pipe.transform(245)).toBe('CCXLV');
  });

  it('should return MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMCDXII', () => {
    const pipe = new RomanPipe();
    expect(pipe.transform(32412)).toBe('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMCDXII');
  });

  it('should return NaN as string', () => {
    const pipe = new RomanPipe();
    expect(pipe.transform(+'asdasd')).toBe('NaN');
  });
});
