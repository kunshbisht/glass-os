import './style.css'
import { useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'

type Line = {
	id: number
	text: string
	isFinal: boolean
	result?: string
}

function commandParser(input: string) {
	switch (input.toLowerCase()) {
		case 'help': return '  Command list:\n   - help\n   - clear (or Ctrl + K)\n   - prenk';
		case 'clear': return 'clear';
		case 'prenk': return 'Press Ctrl/Cmd + W to display prenk';
		default: return '';
	}
}

export default function Component() {
	const [lines, setLines] = useState<Line[]>([
		{ id: Date.now(), text: '', isFinal: false }
	])

	function onKeyDown(e: ReactKeyboardEvent<HTMLInputElement>, id: number) {
		if (e.key === 'Enter') {
			const result = commandParser(e.currentTarget.value);
			if (result === 'clear') setLines([]);
			setLines(prev =>
				prev.map(line =>
					line.id === id ? { ...line, isFinal: true, result } : line
				).concat({ id: Date.now(), text: '', isFinal: false })
			)
		} else if (e.key === 'k' && e.ctrlKey) {
			setLines([{ id: Date.now(), text: '', isFinal: false }])
		}
	}

	function onChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
		const value = e.target.value
		setLines(prev =>
			prev.map(line => (line.id === id ? { ...line, text: value } : line))
		)
	}

	function TerminalLine({ line, isLast }: { line: Line; isLast: boolean }) {
		return (
			<>
				<div className="flex">
					&gt;&nbsp;
					{line.isFinal ? (
						<span>{line.text}</span>
					) : (
						<input
							type="text"
							value={line.text}
							className="outline-none flex-1"
							placeholder='help'
							onKeyDown={e => onKeyDown(e, line.id)}
							onChange={e => onChange(e, line.id)}
							autoFocus={isLast}
						/>
					)}
				</div>
				<div className='whitespace-pre-wrap'>{line.result}</div>
			</>
		)
	}

	return (
		<div className="p-4 font-code">
			{lines.map((line, i) => (
				<TerminalLine
					key={line.id}
					line={line}
					isLast={i === lines.length - 1}
				/>
			))}
		</div>
	)
}
