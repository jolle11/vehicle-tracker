const useCapitalizeFirstLetter = () => {
	return (input: string) => {
		return input[0].toUpperCase() + input.slice(1);
	};
};

export default useCapitalizeFirstLetter;
