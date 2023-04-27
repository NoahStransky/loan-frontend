import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import useFetch from '../../hooks/useFetch';

import api from '../../api';
import {
  IForm,
  AccoutingProvider,
  BalanceSheet,
  DecisionType,
  IResult,
} from '../../types';

function LoanApp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [result, setResult] = useState<IResult>();
  const [currentBalanceSheet, setCurrentBalanceSheet] = useState<
    BalanceSheet[]
  >([]);
  const { data: accountingProviders }: { data: AccoutingProvider[] | null } =
    useFetch('/api/v1/accounting-providers');

  const onSubmit = useCallback(
    async (data: IForm) => {
      const { loanAmount, name, yearEstablished } = data;
      const decisionData: DecisionType = {
        name,
        yearEstablished,
        loanAmount: +loanAmount,
        balanceSheet: currentBalanceSheet,
      };
      try {
        const response = await api.post('/api/v1/make-decision', decisionData);
        setResult(response?.data?.outcome);
      } catch (error) {
        setResult(undefined);
      }
    },
    [currentBalanceSheet],
  );

  const fetchBalanceSheet = useCallback(async (value: string) => {
    try {
      const response = await api.get(
        `/api/v1/get-balance-by-provider?provider=${value}`,
      );
      return response.data;
    } catch (error) {
      console.log('error ', error);
    }
  }, []);

  const onProviderChange = useCallback(
    async (provider: string) => {
      const balanceSheet = await fetchBalanceSheet(provider);
      setCurrentBalanceSheet(balanceSheet);
    },
    [fetchBalanceSheet, setCurrentBalanceSheet],
  );

  useEffect(() => {
    if (accountingProviders) {
      onProviderChange((accountingProviders?.[0] as AccoutingProvider)?.name);
    }
  }, [accountingProviders, onProviderChange]);

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-4">
        Business Loan Application
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="company name"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input ${
              errors.name ? 'border-red-500' : ''
            }`}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm italic">
              Company name can't be empty
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearEstablished"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Year Established
          </label>
          <input
            type="text"
            id="yearEstablished"
            placeholder="year established"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input ${
              errors.yearEstablished ? 'border-red-500' : ''
            }`}
            {...register('yearEstablished', { required: true })}
          />
          {errors.yearEstablished && (
            <span className="text-red-500 text-sm italic">
              Year established can't be empty
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="loanAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="loan amount"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input ${
              errors.loanAmount ? 'border-red-500' : ''
            }`}
            {...register('loanAmount', { required: true, min: 1 })}
          />
          {errors.loanAmount && (
            <span className="text-red-500 text-sm italic">
              Please input a valid amount
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="accountingProvider"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Choose an accounting provider
          </label>
          <select
            id="accountingProvider"
            placeholder="choose an accounting provider"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input ${
              errors.accountingProvider ? 'border-red-500' : ''
            }`}
            {...register('accountingProvider')}
            onChange={e => onProviderChange(e?.target?.value)}
          >
            {(accountingProviders || []).map((provider: AccoutingProvider) => (
              <option key={provider.id} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
          {errors.accountingProvider && (
            <span className="text-red-500 text-sm italic">
              Please select an accounting provider
            </span>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
      {result && (
        <p className="test-center max-w-sm mx-auto mt-4">
          {`you request has been ${result}!`}
        </p>
      )}
    </div>
  );
}

export default LoanApp;
