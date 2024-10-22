import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  let pipe: TitleCasePipe;

  beforeEach(() => {
    pipe = new TitleCasePipe();
  });

  it('should create the TitleCasePipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if input is falsy', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should transform dash-separated lowercase words to title case', () => {
    const result = pipe.transform('hello-world');
    expect(result).toBe('Hello World');
  });

  it('should transform mixed-case dash-separated words to title case', () => {
    const result = pipe.transform('heLLo-WORld');
    expect(result).toBe('Hello World');
  });

  it('should capitalize a single word', () => {
    const result = pipe.transform('hello');
    expect(result).toBe('Hello');
  });

  it('should handle multiple dashes', () => {
    const result = pipe.transform('hello-world-test-case');
    expect(result).toBe('Hello World Test Case');
  });

  it('should handle leading and trailing dashes', () => {
    const result = pipe.transform('-hello-world-');
    expect(result).toBe(' Hello World ');
  });

  it('should transform already capitalized words correctly', () => {
    const result = pipe.transform('Hello-World');
    expect(result).toBe('Hello World');
  });
});
