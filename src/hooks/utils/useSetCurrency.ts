export const useSetCurrency = () => {
	return fetch("https://ipapi.co/json/")
		.then((res) => res.json())
		.then((data) => {
			const countryCode = data.country;
			switch (countryCode) {
				case "US":
					return "$";
				case "GB":
					return "£";
				case "JP":
					return "¥";
				case "ES":
					return "€";
				default:
					return "€";
			}
		})
		.catch(() => "€");
};
