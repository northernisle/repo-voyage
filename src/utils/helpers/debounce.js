let timer = null;

export default (fn, delay) => {
  clearTimeout(timer);

  timer = setTimeout(fn, delay);
}