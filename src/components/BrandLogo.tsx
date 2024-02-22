import { Image } from "@mantine/core";

interface IBrandLogo {
	brand: string;
}

const BrandLogo = ({ brand }: IBrandLogo) => {
	const formattedBrand = brand.trim().toLowerCase().replace(" ", "-");

	return (
		<Image
			h={100}
			fit="contain"
			my={"sm"}
			src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/${formattedBrand}.png`}
		/>
	);
};

export default BrandLogo;
