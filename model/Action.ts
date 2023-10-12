export type Action<T> = {
  inProgress: boolean;
  data: T | null;
};
