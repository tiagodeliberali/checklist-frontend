export const formatGrade = (grade) => {
  return Math.round((grade + Number.EPSILON) * 10 * 100) / 100;
};
