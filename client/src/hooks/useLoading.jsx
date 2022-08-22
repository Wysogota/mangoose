import React from 'react';
import { isEmpty } from 'lodash';
import { Spinner } from 'react-bootstrap';
import MinorHeader from '../components/Headers/MinorHeader';

/**
 * Waits while data will be loaded
 * @param {{data:any, title:string, isFetching:boolean, spinner:boolean}} options 
 * @returns 
 */
const useLoading = (options) => {
  const { data, title = 'Waiting...', isFetching, spinner = true } = options;

  if (!spinner && isFetching) {
    return <></>;
  }

  if (isFetching) {
    return (
      <Spinner animation='border' role='status' />
    );
  }

  if (title && isEmpty(data)) {
    return (
      <MinorHeader className='text-center mt-5 mb-5 fs-3'>{title}</MinorHeader>
    );
  }
};

export default useLoading;
