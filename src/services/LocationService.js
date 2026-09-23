export const getLocationByCity = async (cityName) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?` +
    `q=${cityName}&format=jsonv2`);

  if (!response.ok) throw new Error("API Error");
  return await response.json();

}

export const getLocationByCoordinates = async (lat, lon) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?` +
    `lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`);

  console.log(`https://nominatim.openstreetmap.org/reverse?` +
    `lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`);

  if (!response.ok) throw new Error("API Error");
  return await response.json();

}


