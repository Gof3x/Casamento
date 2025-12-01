export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDaysUntil = (dateString: string): number => {
  const date = new Date(dateString);
  const today = new Date();
  const difference = date.getTime() - today.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

export const generateUUID = (): string => {
  return crypto.randomUUID();
};
