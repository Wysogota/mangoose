import { isArray } from "lodash";

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