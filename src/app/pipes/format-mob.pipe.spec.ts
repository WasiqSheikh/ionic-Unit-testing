import { FormatMobPipe } from './format-mob.pipe';

describe('FormatMobPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatMobPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format mob number to PKR format', () => {
    const pipe = new FormatMobPipe();
    expect(pipe.transform(1234567890)).toBe("+92-1234567890");
  })

  it('should format mob number to USA format', () => {
    const pipe = new FormatMobPipe();
    expect(pipe.transform(1234567890, "USA")).toBe("+1-1234567890");
  })
});
