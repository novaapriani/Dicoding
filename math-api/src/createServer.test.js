const createServer = require('./createServer');
const MathBasic = require('./MathBasic');
const FigureCalculator = require('./FigureCalculator');

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toBeCalledWith(a, b);
    });
  });

  describe('when /GET add', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // arrange
      const a = 20;
      const b = 10;
      const spySubtract = jest.spyOn(MathBasic, 'subtract');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`,
      });

      //   assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(10);
      expect(spySubtract).toBeCalledWith(a, b);
    });
  });

  describe('when /GET multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiply result of a and b correctly', async () => {
      const a = 5;
      const b = 4;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic });

      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(20);
      expect(spyMultiply).toBeCalledWith(a, b);
    });
  });

  describe('when /GET divide', () => {
    it('should respond with a status code of 200 and the payload value is divide result of a and b correctly', async () => {
      const a = 10;
      const b = 5;
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic });

      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(2);
      expect(spyDivide).toBeCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is perimeter of rectangle correctly', async () => {
      // Arrange
      const length = 20;
      const width = 10;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectanglePerimeter = jest.spyOn(
        figureCalculator,
        'calculateRectanglePerimeter',
      );
      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(60); // 2 * (length + width)
      expect(spyCalculateRectanglePerimeter).toBeCalledWith(length, width);
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of rectangle area correctly', async () => {
      const length = 5;
      const width = 3;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectangleArea = jest.spyOn(
        figureCalculator,
        'calculateRectangleArea',
      );
      const server = createServer({ figureCalculator });

      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${length}/${width}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(15);
      expect(spyCalculateRectangleArea).toBeCalledWith(length, width);
    });
  });

  describe('when GET /triangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is result of triangle perimeter', async () => {
      const sideA = 4;
      const sideB = 5;
      const base = 3;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyTrianglePerimeter = jest.spyOn(
        figureCalculator,
        'calculateTrianglePerimeter',
      );
      const server = createServer({ figureCalculator });

      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${sideA}/${sideB}/${base}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(12);
      expect(spyTrianglePerimeter).toBeCalledWith(sideA, sideB, base);
    });
  });

  describe('when GET /triangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of triangle area correctly', async () => {
      const base = 5;
      const height = 2;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTriangleArea = jest.spyOn(
        figureCalculator,
        'calculateTriangleArea',
      );
      const server = createServer({ figureCalculator });

      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(5);
      expect(spyCalculateTriangleArea).toBeCalledWith(base, height);
    });
  });
});
