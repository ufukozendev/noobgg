import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { Context } from 'hono';

// Import AFTER any potential mocking (though this controller doesn't use db)
import { homeController } from './v1/main.controller';

// Mock Hono's context
const mockText = mock();

const mockContext = () => ({
  text: mockText,
}) as unknown as Context;

describe('Main Controller', () => {
  beforeEach(() => {
    mockText.mockClear();
  });

  describe('homeController', () => {
    it('should call context.text with "Hello Hono!" message', () => {
      const c = mockContext();
      homeController(c);

      expect(mockText).toHaveBeenCalledWith('Hello Hono!');
    });

    it('should call context.text method exactly once', () => {
      const c = mockContext();
      homeController(c);

      expect(mockText).toHaveBeenCalledTimes(1);
    });

    it('should return the response from context.text method', () => {
      // Give mock an explicit return value to strengthen the test
      // Using a unique string ensures the test fails if controller doesn't forward the response
      const mockResponse = 'MOCK_TEXT_RESPONSE_12345' as any;
      mockText.mockReturnValue(mockResponse);

      const c = mockContext();
      const result = homeController(c);

      expect(mockText).toHaveBeenCalledWith('Hello Hono!');
      expect(result).toBe(mockResponse);
    });
  });
});
