import { useEffect, useState } from "react";

function useGetImageCountry(countryName) {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!countryName) return; 
        const API_KEY = "41301808-e86fa23811faafdafbfc9238a";
        const encodedCountryName = encodeURIComponent(countryName);
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodedCountryName}&image_type=photo`;

        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                if (data.totalHits > 0) {
                    setImageUrl(data.hits[0].webformatURL);
                } else {
                    console.log(`No se encontraron imágenes para ${countryName}`);
                }
            })
            .catch((error) => console.error("Error fetching images:", error));
    }, [countryName]);

    return { imageUrl };
}

export default useGetImageCountry;