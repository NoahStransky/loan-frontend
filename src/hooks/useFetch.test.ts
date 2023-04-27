import { renderHook, waitFor } from '@testing-library/react';
import axios from '../api';
import MockAdapter from 'axios-mock-adapter';
import useFetch from './useFetch';

describe('useFetch', () => {
  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'John Doe' };
    const mockUrl = '/api/v1/accounting-providers';
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(mockUrl).reply(200, { data: mockData });

    const { result } = renderHook(() => useFetch(mockUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual(mockData);
    });
  });

  it('handles errors', async () => {
    const mockUrl = '/api/v1/accounting-providers';
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(mockUrl).reply(500, undefined);

    const { result } = renderHook(() => useFetch(mockUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).not.toBe(null);
      expect(result.current.data).toBe(null);
    });
  });
});
