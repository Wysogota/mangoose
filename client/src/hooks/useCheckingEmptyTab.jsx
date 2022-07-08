import React from 'react';
import { isEmpty } from 'lodash';
import MinorHeader from '../components/Headers/MinorHeader';

const useCheckingEmptyTab = (data, title) => {
  if (isEmpty(data)) {
    return (
      <MinorHeader className='text-center mt-5 mb-5'>{title}</MinorHeader>
    );
  }
};

export default useCheckingEmptyTab;
