const useNumberFormat = () => {
	return (input: string | number | null) =>
		Math.abs(Number(input)).toFixed(2).replace(".", ",");
};

export default useNumberFormat;
