const myAsync = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
};
myAsync("https://bootcamp.fjord.jp");
