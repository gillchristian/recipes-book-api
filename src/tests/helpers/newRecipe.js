function getSuffix() {
  return Math.floor(Math.random() * Math.pow(10, 5))
}

module.exports = () => {
  const suffix = getSuffix();
  return {
    name: `Pie number ${suffix}`,
    ingredients: [
      `${getSuffix()} eggs`,
      `${getSuffix()} cups of suggar`,
      `${getSuffix()} cups of flour`,
    ],
    instructions: 'Lorem ipsum dolor eggs and flur and suggar. Cook all.',
    image: `http://some-url/img-${suffix}.png`,
    suffix,
  };
};
