import { ComponentType, Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface LazyComponentProps {
	component: React.LazyExoticComponent<ComponentType<unknown>>;
}

// Компонент-обертка для Suspense
const LazyComponent: React.FC<LazyComponentProps> = ({ component: Component }) => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Component />
		</Suspense>
	);
};

export default LazyComponent;