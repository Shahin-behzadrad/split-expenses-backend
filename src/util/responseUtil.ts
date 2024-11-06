export const formatResponse = (
  status: number,
  message: string,
  data: any = null,
  additional: any = {},
  errors: any[] = []
) => {
  return {
    status,
    message,
    detail: null,
    data,
    additional,
    errors,
  };
};
