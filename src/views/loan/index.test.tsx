import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoanApp from './index';
import axios from '../../api';

describe('LoanApp', () => {
  it('should render the form correctly', () => {
    const { getByLabelText, getByText } = render(<LoanApp />);

    expect(getByLabelText('Company Name')).toBeInTheDocument();
    expect(getByLabelText('Year Established')).toBeInTheDocument();
    expect(getByLabelText('Loan Amount')).toBeInTheDocument();
    expect(getByLabelText('Choose an accounting provider')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should show error message when loan amount input is invalid', async () => {
    const { getByLabelText, getByText } = render(<LoanApp />);

    fireEvent.change(getByLabelText('Loan Amount'), { target: { value: 0 } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Please input a valid amount')).toBeInTheDocument();
    });
  });

  it('should show success message when form is submitted successfully', async () => {
    const { getByLabelText, getByText } = render(<LoanApp />);

    const mockResponse = { data: { outcome: 'approved' } };
    const mockUrl = '/api/v1/make-decision';
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost(mockUrl).reply(200, mockResponse);

    fireEvent.change(getByLabelText('Company Name'), {
      target: { value: 'Test Company' },
    });
    fireEvent.change(getByLabelText('Year Established'), {
      target: { value: '2020' },
    });
    fireEvent.change(getByLabelText('Loan Amount'), {
      target: { value: 100000 },
    });
    fireEvent.change(getByLabelText('Choose an accounting provider'), {
      target: { value: 'Test Provider' },
    });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockAxios.history.post[0].url).toEqual(mockUrl);
      expect(getByText('you request has been approved!')).toBeInTheDocument();
    });
  });
});
