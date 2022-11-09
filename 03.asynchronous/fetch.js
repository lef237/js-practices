fetch("https://bootcamp.fjord.jp")
  .then((response) => response.text())
  .then((data) => console.log(data));
