import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`;

const getUnsplashImages = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee stores',
    orientation: 'landscape',
    perPage: 10,
  });
  const photoResponse = photos.response.results;
  return photoResponse.map((item) => item.urls.small);
};
export const fetchCoffeeStores = async () => {
  const photos = await getUnsplashImages();
  const res = await fetch(
    getUrlForCoffeeStores(
      '43.65267326999575,-79.39545615725015',
      'coffee stores',
      '6'
    ),
    {
      headers: {
        Authorization: `${process.env.FOURSQUARE_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data.results.map((item, index) => ({
    id: item.fsq_id,
    address: item.location.address || 'Address not available',
    neighborhood:
      item.location.neighborhood || item.location.cross_street || '',
    name: item.name,
    imgUrl: photos[index],
  }));
};
