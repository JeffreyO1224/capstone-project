export const convertSnakeToCamel = (snakeObj) => {
  if (snakeObj) {
    const camelObj = {};

    for (const key in snakeObj) {
      if (Object.prototype.hasOwnProperty.call(snakeObj, key)) {
        const camelKey = key.replace(/_(\w)/g, (_, letter) =>
          letter.toUpperCase()
        );
        camelObj[camelKey] = snakeObj[key];
      }
    }

    return camelObj;
  }
  return null;
};

export const arrayConvertSnakeToCamel = (snakeArray) => {
  const convertedData = [];

  snakeArray.forEach((data) => convertedData.push(convertSnakeToCamel(data)));

  return convertedData;
};
