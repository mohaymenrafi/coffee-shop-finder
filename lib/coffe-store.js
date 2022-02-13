import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`;

const getUnsplashImages = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee stores',
    orientation: 'landscape',
    perPage: 30,
  });
  const photoResponse = photos.response.results;
  return photoResponse.map((item) => item.urls.small);
};
export const fetchCoffeeStores = async (
  latlong = '43.65267326999575,-79.39545615725015',
  limit = '6'
) => {
  const photos = await getUnsplashImages();
  const res = await fetch(
    getUrlForCoffeeStores(latlong, 'coffee stores', limit),
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
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
