export const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=f4f06b44f097d50bc065937344408b11&language=en-US&include_adult=false&page=1`
  );
  return response.json();
};
