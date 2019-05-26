function Toker(t) {
  const T = t;

  return function() {
    return T; 
  };
};

module.exports = {
  Token: Toker
};
