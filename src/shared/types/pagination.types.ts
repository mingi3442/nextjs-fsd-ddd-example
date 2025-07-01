export type Pagination<T> = {
  data: T[];
  pagination: {
    limit: number;
    skip: number;
    total: number;
  };
};
