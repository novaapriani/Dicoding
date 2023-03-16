const MathBasic = require('./MathBasic');
const MatchBasic = require('./MathBasic');

describe('A Math Basic', () => {
  it('should contain add, subtract, multiply, and divide function', () => {
    expect(MatchBasic).toHaveProperty('add');
    expect(MatchBasic).toHaveProperty('subtract');
    expect(MatchBasic).toHaveProperty('multiply');
    expect(MatchBasic).toHaveProperty('divide');
    expect(MatchBasic.add).toBeInstanceOf(Function);
    expect(MatchBasic.subtract).toBeInstanceOf(Function);
    expect(MatchBasic.multiply).toBeInstanceOf(Function);
    expect(MatchBasic.divide).toBeInstanceOf(Function);
  });
});

describe('An Add Function', () => {
  it('should throw error when not given 2 parameters', () => {
    expect(() => MathBasic.add()).toThrowError();
    expect(() => MathBasic.add(1)).toThrowError();
    expect(() => MathBasic.add(1, 2, 3)).toThrowError();
    expect(() => MathBasic.add(1, 2, 3, 4)).toThrowError();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MatchBasic.add('1', '1')).toThrowError();
    expect(() => MathBasic.add(true, {})).toThrowError();
    expect(() => MathBasic.add(null, false)).toThrowError();
  });

  it('should return a + b when given two number parameters', () => {
    expect(MathBasic.add(2, 2)).toEqual(4);
    expect(MathBasic.add(16, 8)).toEqual(24);
    expect(MathBasic.add(3, 7)).toEqual(10);
  });

  describe('A Subtract Function', () => {
    it('should throw error when not given 2 parameters', () => {
      expect(() => MathBasic.subtract()).toThrowError();
      expect(() => MathBasic.subtract(1)).toThrowError();
      expect(() => MathBasic.subtract(1, 2, 3)).toThrowError();
      expect(() => MathBasic.subtract(1, 2, 3, 4)).toThrowError();
    });

    it('should throw error when given non-number parameters', () => {
      expect(() => MatchBasic.subtract('1', '1')).toThrowError();
      expect(() => MathBasic.subtract(true, {})).toThrowError();
      expect(() => MathBasic.subtract(null, false)).toThrowError();
    });

    it('should return a + b when given two number parameters', () => {
      expect(MathBasic.subtract(2, 2)).toEqual(0);
      expect(MathBasic.subtract(16, 8)).toEqual(8);
      expect(MathBasic.subtract(3, 7)).toEqual(-4);
    });
  });
});
