/* eslint-disable implicit-arrow-linebreak */
const FigureCalculator = require('./FigureCalculator');
const MathBasic = require('./MathBasic');

describe('A FigureCalculator', () => {
  it('should contain calculateRectanglePerimeter, calculateRectangleArea, calculateTrianglePerimeter, and calculateTriangleArea functions', () => {
    const figureCalculator = new FigureCalculator({});

    expect(figureCalculator).toHaveProperty('calculateRectanglePerimeter');
    expect(figureCalculator).toHaveProperty('calculateRectangleArea');
    expect(figureCalculator).toHaveProperty('calculateTrianglePerimeter');
    expect(figureCalculator).toHaveProperty('calculateTriangleArea');
    expect(figureCalculator.calculateRectanglePerimeter).toBeInstanceOf(
      Function,
    );
    expect(figureCalculator.calculateRectangleArea).toBeInstanceOf(Function);
    expect(figureCalculator.calculateTrianglePerimeter).toBeInstanceOf(
      Function,
    );
    expect(figureCalculator.calculateTriangleArea).toBeInstanceOf(Function);
  });
});

describe('A calculateRectanglePerimeter function', () => {
  it('should throw error when not given 2 parameters', () => {
    const figureCalculator = new FigureCalculator({});

    expect(() => figureCalculator.calculateRectanglePerimeter()).toThrowError();
    expect(() =>
      figureCalculator.calculateRectanglePerimeter(1),
    ).toThrowError();
    expect(() =>
      figureCalculator.calculateRectanglePerimeter(1, 2, 3),
    ).toThrowError();
  });

  it('should throw error when given non-number parameters', () => {
    const figureCalculator = new FigureCalculator({});

    expect(() =>
      figureCalculator.calculateRectanglePerimeter(true, {}),
    ).toThrowError();
    expect(() =>
      figureCalculator.calculateRectanglePerimeter(null, '2'),
    ).toThrowError();
    expect(() =>
      figureCalculator.calculateRectanglePerimeter({}, []),
    ).toThrowError();
  });

  it('should return correct value based on rectangle perimeter formula', () => {
    // Arrange
    const length = 20;
    const width = 10;
    const spyAdd = jest.spyOn(MathBasic, 'add');
    const spyMultiply = jest.spyOn(MathBasic, 'multiply');
    const figureCalculator = new FigureCalculator(MathBasic);

    // Action
    const result = figureCalculator.calculateRectanglePerimeter(length, width);

    // Assert
    expect(result).toEqual(60); // 2 x (length + width)
    expect(spyAdd).toHaveBeenCalledWith(length, width);
    expect(spyMultiply).toHaveBeenCalledWith(2, 30); // (length + width)
  });

  describe('A calculateRectangleArea function', () => {
    it('should throw error when not given 2 parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() => figureCalculator.calculateRectangleArea()).toThrowError();
      expect(() => figureCalculator.calculateRectangleArea(1)).toThrowError();
      expect(() =>
        figureCalculator.calculateRectangleArea(1, 2, 3),
      ).toThrowError();
    });

    it('should throw error when given non-number parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() =>
        figureCalculator.calculateRectangleArea(null, '1'),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectangleArea({}, true),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateRectangleArea([], {}),
      ).toThrowError();
    });

    it('should return correct value based on rectangle area formula', () => {
      // arrange
      const length = 20;
      const width = 10;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const figureCalculator = new FigureCalculator(MathBasic);

      // action
      const result = figureCalculator.calculateRectangleArea(length, width);

      // assert
      expect(result).toEqual(200);
      expect(spyMultiply).toBeCalledWith(length, width);
    });
  });

  describe('A calculateTrianglePerimeter Function', () => {
    it('should throw error when not given 3 parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() =>
        figureCalculator.calculateTrianglePerimeter(),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateTrianglePerimeter(1),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateTrianglePerimeter(1, 2),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateTrianglePerimeter(1, 2, 3, 4),
      ).toThrowError();
    });

    it('should throw error when given non-number parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() => figureCalculator.calculateTrianglePerimeter(null, '1', 2));
      expect(() =>
        figureCalculator.calculateTrianglePerimeter({}, true, false),
      );
      expect(() =>
        figureCalculator.calculateTrianglePerimeter([], {}, 12),
      ).toThrowError();
    });

    it('should return correct value based on triangle perimeter formula', () => {
      // arrange
      const sideA = 2;
      const sideB = 3;
      const base = 3;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const figureCalculator = new FigureCalculator(MathBasic);

      // action
      const result = figureCalculator.calculateTrianglePerimeter(
        sideA,
        sideB,
        base,
      );

      // asssert
      expect(result).toEqual(8);
      expect(spyAdd).toBeCalledWith(sideA, sideB + base);
    });
  });

  describe('A calculatedTriangleArea function', () => {
    it('should throw error when not given 2 parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() => figureCalculator.calculateTriangleArea()).toThrowError();
      expect(() => figureCalculator.calculateTriangleArea(1)).toThrowError();
      expect(() =>
        figureCalculator.calculateTriangleArea(1, 2, 3),
      ).toThrowError();
    });

    it('should throw error when given non-number parameters', () => {
      const figureCalculator = new FigureCalculator({});

      expect(() =>
        figureCalculator.calculateTriangleArea('1', null),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateTriangleArea(true, false),
      ).toThrowError();
      expect(() =>
        figureCalculator.calculateTriangleArea({}, []),
      ).toThrowError();
    });

    it('should return correct value based on triangle area formula', () => {
      const base = 5;
      const height = 2;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const figureCalculator = new FigureCalculator(MathBasic);

      const result = figureCalculator.calculateTriangleArea(base, height);

      expect(result).toEqual(5);
      expect(spyMultiply).toBeCalledWith(base, height);
      expect(spyDivide).toBeCalledWith(10, 2);
    });
  });
});
