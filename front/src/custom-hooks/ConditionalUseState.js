import { useState } from "react";

const useConditionalState = (condition, initialState) => {
	const [state, setState] = useState(initialState);

	if (!condition) {
		// Возвращаем заглушки если состояние не нужно
		return [null, () => {}];
	}

	return [state, setState];
};

export default useConditionalState;
