import { useId } from 'react'

import InfoIcon from '@/shared/assets/icons/info.svg'

interface InfoTooltipProps {
	label: string
	text: string
}

export const InfoTooltip = ({ label, text }: InfoTooltipProps) => {
	const tooltipId = useId()

	return (
		<span className="group relative inline-flex self-center">
			<button
				type="button"
				aria-label={label}
				aria-describedby={tooltipId}
				className="cursor-help rounded-full text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted"
			>
				<InfoIcon className="size-4" />
			</button>
			<span
				id={tooltipId}
				role="tooltip"
				className="invisible absolute bottom-full right-[50%] translate-x-[50%] -translate-y-[8%] z-10 mt-2 w-64 rounded-xl p-4 text-sm font-normal text-main opacity-0 bg-white border border-muted shadow-lg transition-discrete duration-300 ease-in-out group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
			>
				{text}
			</span>
		</span>
	)
}
