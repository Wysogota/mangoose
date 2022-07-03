export const selectRelationshipAttr = (relationships, type) =>
  relationships.filter((item) => item.type === type)[0].attributes;