class Helper {
	static aN = (number) => number || 0

	static countWord = (count, form1, form2, form5) => {
		const remainder = count % 100 - count % 10;

		if (count === 1) {
			return form1;
		}

		if (remainder !== 10 && (count % 10 >= 2 && count % 10 <= 4)) {
			return form2;
		}

		return form5;
	}

	static numberFormat = (number, decimals, decPoint = ',', thousandsSep = '') => {
		const parts = [];
		const str = parseFloat(number).toFixed(decimals || 0).toString().split('.');

		for (let i = str[0].length; i > 0; i -= 3) {
			parts.unshift(str[0].substring(Math.max(0, i - 3), i));
		}

		str[0] = parts.join(thousandsSep);
		return str.join(decPoint);
	}
}


export default Helper;