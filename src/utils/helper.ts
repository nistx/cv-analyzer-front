import { NO_ESPECIFICADO } from "@/constants/messages"

export const getDisplayValue = (value: string | undefined): string => {
	return value?.trim() ? value : NO_ESPECIFICADO
}
