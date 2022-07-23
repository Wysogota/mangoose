import React from 'react';
import { isEmpty } from 'lodash';
import { Spinner } from 'react-bootstrap';
import MinorHeader from '../components/Headers/MinorHeader';

const useLoading = (options) => {
  const { data, title, isFetching } = options;

  if (isFetching) {
    return (
      <Spinner animation='border' role='status'></Spinner>
    );
  }
  if (isEmpty(data)) {
    return (
      <MinorHeader className='text-center mt-5 mb-5'>{title}</MinorHeader>
    );
  }
};

export default useLoading;
