import React, { ReactNode } from "react"

interface ConditionalSectionProps {
	title: string
	data?: unknown
	children: ReactNode
	icon?: ReactNode
}

const ConditionalSection: React.FC<ConditionalSectionProps> = ({
	title,
	data,
	children,
	icon,
}) => {
	const shouldRender = Array.isArray(data) ? data.length > 0 : !!data

	if (!shouldRender) {
		return null
	}

	return (
		<div className="mt-6">
			<div className="flex items-center gap-2 mb-2">
				{icon && <span>{icon}</span>}
				<h1 className="font-semibold mb-0">{title}</h1>
			</div>
			{children}
		</div>
	)
}

export default ConditionalSection
