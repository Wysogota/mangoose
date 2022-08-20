import { isArray } from 'lodash';
import CONSTANTS from '../../constants';
const { WEBSITE_NAME, DEFAULT_LOCALE, ALT_LOCALE } = CONSTANTS;

export const selectRelationship = (relationships, type) => {
  if (isArray(type)) {
    const result = {};
    type.forEach((type) => Object.assign(
      result, {
      [type]: relationships.filter(({ type: itemType }) => type === itemType)[0]
    }));
    return result;
  }
  return relationships.filter((item) => item.type === type)[0];
};

export const getPageTitle = (title) => `${title} - ${WEBSITE_NAME}`;

export const getObjectFromArray = (arr, prop, propValue) => arr.filter((item) => item[prop] === propValue)[0];

export const getLocaleValue = (obj) => obj[DEFAULT_LOCALE] || obj[ALT_LOCALE] || Object.values(obj)[0];

export const mergeArrObjectsById = (arr1, arr2) => arr1.map(t1 => ({
  ...t1, ...arr2.find(t2 => t2.id === t1.id)
}));
