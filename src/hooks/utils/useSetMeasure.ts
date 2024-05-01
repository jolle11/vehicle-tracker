export const useSetMeasure = () => {
	return fetch("https://ipapi.co/json/")
		.then((res) => res.json())
		.then((data) => {
			const countryCode = data.country;
			switch (countryCode) {
				case "US":
					return "mi";
				case "GB":
					return "mi";
				default:
					return "km";
			}
		})
		.catch(() => "km");
};
