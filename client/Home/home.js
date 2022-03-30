const apiCall = async () => {
  const result = await fetch("http://localhost:5000/categories");
  const data = await result.json();
  return data;
};
