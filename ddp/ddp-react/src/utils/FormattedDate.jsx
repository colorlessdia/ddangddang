export const formattedDate = (date) => {
  //2023-08-16T01:16:40.000Z
  const [datePart1, datePart2] = date.split('T');

  return `${datePart1} ${datePart2.slice(0, -5)}`;
};