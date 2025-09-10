export default function Icon() {
	return <svg width="100%" viewBox="-50 -50 100 100">
		<defs>
			<linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
				<stop offset="0%" stopColor="#222" />
				<stop offset="100%" stopColor="#333" />
			</linearGradient>
		</defs>
		<rect x={-50} y={-50} width={100} height={100} fill="#ddd" />
		<rect x={-40} y={-40} width={80} height={80} fill="url(#grad1)" rx={10} />
		<polygon points="-20,-20 0,-5 0,5 -20,20 -20,10 -7,0 -20,-10" fill="lime" />
		<rect x={0} y={15} width={20} height={5} fill="lime" />
	</svg>
}