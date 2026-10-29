import { type InputHTMLAttributes } from 'react'

import CheckIcon from '@/shared/assets/icons/check.svg'

interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string
	description?: string
}

export const Checkbox = ({
	label,
	description,
	...inputProps
}: CheckboxProps) => (
	<label
		title={description}
		className="inline-flex w-fit min-h-6 cursor-pointer items-center gap-2 text-base font-normal"
	>
		<span className="relative m-0.5 size-5">
			<input
				type="checkbox"
				className="peer size-5 cursor-pointer appearance-none rounded-[3px] border-2 border-main bg-white hover:bg-checkbox-hover checked:border-main checked:bg-main checked:hover:bg-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted transition-colors duration-300"
				{...inputProps}
			/>
			<CheckIcon className="pointer-events-none absolute inset-0 m-auto hidden size-3 text-white peer-checked:block" />
		</span>
		<span>{label}</span>
	</label>
)
