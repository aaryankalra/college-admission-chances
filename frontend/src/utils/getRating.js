export const getRating = (score) => {
  if (score >= 80) return 5;
  if (score >= 70) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
};
