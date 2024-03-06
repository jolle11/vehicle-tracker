import { Image } from "@mantine/core";

interface IBrandLogo {
	brand: string;
	page?: boolean;
}

const BrandLogo = ({ brand, page = false }: IBrandLogo) => {
	const formattedBrand = brand.trim().toLowerCase().replace(" ", "-");
	const fallbackBrand = brand.toUpperCase().replace(" ", "+");

	return (
		<Image
			h={page ? undefined : 100}
			fit="contain"
			my={"sm"}
			src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/${formattedBrand}.png`}
			fallbackSrc={`https://placehold.co/600x400?text=${fallbackBrand}`}
		/>
	);
};

export default BrandLogo;
