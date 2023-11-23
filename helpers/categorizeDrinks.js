/** @format */

const categorizeDrinks = (drinks, maxPerCategory = 4) => {
  const categorizedDrinks = {};

  drinks.forEach((drink) => {
    const { category } = drink;

    if (!categorizedDrinks[category]) {
      categorizedDrinks[category] = [];
    }

    if (categorizedDrinks[category].length < maxPerCategory) {
      categorizedDrinks[category].push(drink);
    }
  });

  return categorizedDrinks;
};

export default categorizeDrinks;
