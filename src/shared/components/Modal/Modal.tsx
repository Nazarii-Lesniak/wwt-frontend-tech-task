import {
	type MouseEvent,
	type ReactNode,
	type SyntheticEvent,
	useEffect,
	useId,
	useRef
} from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@/shared/assets/icons/close.svg'

interface ModalActions {
	left?: ReactNode
	center?: ReactNode
	right?: ReactNode
}

interface ModalProps {
	title: string
	onClose: () => void
	children?: ReactNode
	actions?: ModalActions
}

export const Modal = ({ title, onClose, children, actions }: ModalProps) => {
	const { t } = useTranslation('common')
	const titleId = useId()
	const dialogRef = useRef<HTMLDialogElement>(null)
	const isBackdropClick = useRef(false)

	useEffect(() => {
		const dialog = dialogRef.current
		const opener = document.activeElement

		if (dialog && !dialog.open) {
			dialog.showModal()
		}

		return () => {
			if (dialog?.open) {
				dialog.close()
			}

			if (opener instanceof HTMLElement) {
				opener.focus()
			}
		}
	}, [])

	const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
		event.preventDefault()
		onClose()
	}

	const handleMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
		isBackdropClick.current = event.target === event.currentTarget
	}

	const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (isBackdropClick.current && event.target === event.currentTarget) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onCancel={handleCancel}
			onMouseDown={handleMouseDown}
			onClick={handleClick}
			className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-black/40 p-4 md:py-8 border-none backdrop:bg-transparent open:flex"
		>
			<div
				className="m-auto w-full max-w-[1280px] flex flex-col rounded-2xl bg-white p-0 text-main shadow-modal"
				onClick={e => e.stopPropagation()}
			>
				<header className="relative flex shrink-0 items-center justify-center px-8 py-8">
					<h2
						id={titleId}
						className="px-8 text-center text-[40px] font-medium"
					>
						{title}
					</h2>
					<button
						type="button"
						aria-label={t('close')}
						onClick={onClose}
						className="absolute top-1/2 right-8 -translate-y-1/2 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted"
					>
						<CloseIcon className="size-6 hover:text-primary-hover transition-colors duration-300" />
					</button>
				</header>

				<hr className="mx-8 shrink-0 border-t-2 border-line" />

				{children && <div className="px-8">{children}</div>}

				<footer className="grid shrink-0 items-center grid-cols-[1fr_auto_1fr] justify-items-center gap-6 px-8 py-8">
					<div className="justify-self-start">{actions?.left}</div>
					<div>{actions?.center}</div>
					<div className="justify-self-end">{actions?.right}</div>
				</footer>
			</div>
		</dialog>
	)
}
