import { ParsedUrlQueryInput } from "querystring";

type Fields = {
  label: string;
  name: number | string;
};

export type FilterItemsArg = {
  title: string;
  name: string;
  type: string;
  fields: Fields[];
}[];

type ParseArgs = {
  queryString: ParsedUrlQueryInput;
  filterItems: FilterItemsArg;
};

export function parseQueryStringToWhere({
  queryString,
  filterItems
}: ParseArgs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};

  Object.keys(queryString)
    .filter((item) => item !== "sort")
    .forEach((key) => {
      const item = filterItems?.find((item) => item.name === key);
      const isCheckbox = item?.type === "checkbox";

      obj[key] = !isCheckbox
        ? queryString[key]
        : { name_contains: queryString[key] };
    });

  return obj;
}

export function parseQueryStringToFilter({
  queryString,
  filterItems
}: ParseArgs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};

  Object.keys(queryString).forEach((key) => {
    const item = filterItems?.find((item) => item.name === key);

    const isCheckbox = item?.type === "checkbox";
    const isArray = Array.isArray(queryString[key]);

    obj[key] = !isArray && isCheckbox ? [queryString[key]] : queryString[key];
  });

  return obj;
}
