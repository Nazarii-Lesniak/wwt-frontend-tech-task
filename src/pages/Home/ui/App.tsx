import { Button } from '@/shared/components/Button'
import { Checkbox } from '@/shared/components/Checkbox'
import { InfoTooltip } from '@/shared/components/InfoTooltip'

export const App = () => {
	return (
		<section className="w-full h-dvh flex flex-col gap-4 items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			{/* For preview */}
			<Button variant="primary" />
			<div className="flex items-center gap-2">
				<Checkbox label="Braille and tactile information" />
				<InfoTooltip
					label="Tooltip label"
					text="Braille and raised-touch signage, lift buttons, maps and printed materials for guests who read by touch."
					key={1}
				/>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox label="Visual alerts and announcements" />
				<InfoTooltip
					label="Tooltip label"
					text="Announcements and alerts in public areas are shown visually, not only spoken, for deaf and hard of hearing guests."
					key={1}
				/>
			</div>
		</section>
	)
}
