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

export type StorePayload = {
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};
