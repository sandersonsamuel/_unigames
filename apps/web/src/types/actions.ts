export type ActionType<T> = {
  message: string;
  data?: T;
  errors?: {
    [key: string]: string[];
  } | null;
  status: "success" | "error";
};
