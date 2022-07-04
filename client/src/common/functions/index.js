import { isArray } from "lodash";

export const selectRelationshipAttr = (relationships, type) => {
  if (isArray(type)) {
    const result = {};
    type.forEach((type) => Object.assign(
      result, {
      [type]: relationships.filter(({ type: itemType }) => type === itemType)[0].attributes
    }));
    return result;
  }
  return relationships.filter((item) => item.type === type)[0].attributes;
};