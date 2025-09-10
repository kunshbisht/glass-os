import { useEffect, useState } from "react";

const r = 25;
const dt = 15;
const speed = 0.002;

export default function Icon() {
	const [angle, setAngle] = useState(0);
	const x = r * Math.cos(angle);
	const y = r * Math.sin(angle);

	useEffect(() => {
		const interval = setInterval(() => {
			setAngle(a => a + speed * dt)
		}, dt);
		return () => clearInterval(interval)
	})

	return <svg width="100%" viewBox="-50 -50 100 100">
		<defs>
			<linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
				<stop offset="0%" stopColor="#222" />
				<stop offset="100%" stopColor="#333" />
			</linearGradient>
		</defs>
		<rect x={-50} y={-50} width={100} height={100} fill="url(#grad1)" />
		<circle r={35} fill="white" />
		<line x1={0} y1={0} x2={x} y2={y} stroke="orange" strokeWidth={5} strokeLinecap="round" />
	</svg>
}