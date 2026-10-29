/* eslint-disable i18next/no-literal-string */
import { useState } from 'react'

import { Button } from '@/shared/components/Button'
import { Checkbox } from '@/shared/components/Checkbox'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import { Modal } from '@/shared/components/Modal'

export const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<section className="w-full h-dvh flex flex-col gap-4 items-center justify-center">
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>

			{/* For preview */}
			<Button
				variant="primary"
				onClick={() => setIsModalOpen(true)}
			>
				Open Filter
			</Button>
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

			{isModalOpen && (
				<Modal
					title="Filter"
					onClose={() => setIsModalOpen(false)}
					actions={{
						left: (
							<Button
								variant="primary"
								onClick={() => setIsModalOpen(false)}
							>
								Reset
							</Button>
						),
						center: (
							<Button
								variant="primary"
								onClick={() => setIsModalOpen(false)}
							>
								Apply
							</Button>
						)
					}}
				/>
			)}
		</section>
	)
}
