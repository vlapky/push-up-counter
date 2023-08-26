export const calcContent = (counter) => {
  const sum = counter.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const nums = counter
    .map((item, index) => (index === 0 ? item : ` + ${item}`))
    .join("");

  return sum === 0 ? 0 : `${sum} = ${nums}`;
};

export const calcCurrentDate = () => {
  return new Date().toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  });
};

export const calcContentForCopy = (counters) => {
  const data = [];
  data.push(calcCurrentDate());

  Object.keys(counters).forEach((id) => {
    const { name, counter } = counters[id];
    data.push(`${name}\n${calcContent(counter)}`);
  });

  return data.join("\n");
};
