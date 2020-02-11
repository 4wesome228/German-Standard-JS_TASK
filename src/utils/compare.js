export const compare = (sortType, sortField) => (a, b) => {
  let result = 0;
  console.log(a[sortField] === b[sortField]);
  if (a[sortField] === b[sortField]) return 0;
  a[sortField] > b[sortField] ? (result = 1) : (result = -1);
  return sortType === "asc" ? result : -1 * result;
};
