export const TitleFy = (text) => {
  if (text[0] === text[0].toUpperCase()) {
    return text;
  }
  const f = text[0].toUpperCase();
  const o = text.slice(1);
  const final = f + o;
  return final;
};

export const Camelfy = (text, divider) => {
  let newText = "";
  let number = 0;
  text.forEach((char) => {
    if (char === divider) {
      number = 1;
    } else {
      if (number === 1) {
        newText += char.toUpperCase();
        number = 0;
      } else {
        newText += char;
      }
    }
  });
  return newText;
};
