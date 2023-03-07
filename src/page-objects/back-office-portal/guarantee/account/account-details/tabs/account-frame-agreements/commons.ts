const splitText = (text) => {
  const arr = text.split(": ");
  return { leftText: arr[0].trim(), rightText: arr[1].trim() };
};

export { splitText };