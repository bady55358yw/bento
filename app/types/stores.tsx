export type Store = {
  _id: string;
  _creationTime: number;
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};

export type StoresResponse = {
  page: Store[];
  continueCursor: string;
  isDone: boolean;
};

export type CreateStorePayload = {
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};
