import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
}

const BASE_CLASSES =
	'cursor-pointer text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted disabled:cursor-not-allowed disabled:opacity-50'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary:
		'h-16 min-w-46 rounded-2xl bg-primary px-6 font-semibold text-whitehover:bg-primary-hover active:bg-primary-hover',
	link: 'font-normal text-link underline underline-offset-2 hover:text-muted active:text-main'
}

export const Button = ({
	variant = 'primary',
	type = 'button',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`}
		{...props}
	/>
)
