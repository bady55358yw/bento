export type Category = {
  nth: number;
  storeId: string;
  title: string;
  _creationTime: number;
  _id: string;
};

export type CategoryResponse = {
  page: Category[];
  continueCursor: string;
  isDone: boolean;
};

export type UpdateCategoryPayload = {
  title: string
};

export type CreateCategoryPayload = {
  title: string
};