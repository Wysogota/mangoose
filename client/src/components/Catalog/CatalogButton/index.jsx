import React from 'react';
import { Link } from 'react-router-dom';
import ColBlock from '../../Blocks/ColBlock';
import NavItems from '../../NavItems';
const { Catalog } = NavItems;

const CatalogButton = () => {
  return (
    <ColBlock className='col-4 col-md-3 m-auto'>
      {Catalog(Link, { className: 'justify-content-center fs-5' })}
    </ColBlock>
  );
};

export default CatalogButton;