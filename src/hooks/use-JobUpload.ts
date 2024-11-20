import { useState } from "react"
import { uploadJobDescription } from "@/services/jobService"
import { JobDescriptionResponse } from "@/types/jobTypes"

export function useJobUpload(jobDescription: string, files: FileList | null) {
	const [progress, setProgress] = useState(0)
	const [currentCV, setCurrentCV] = useState(0)
	const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0)
	const [abortController, setAbortController] =
		useState<AbortController | null>(null)

	const averageProcessingTimePerCV = 10

	const upload = async (): Promise<JobDescriptionResponse | null> => {
		if (!files || files.length === 0) {
			return null
		}

		const totalCVs = files.length
		const totalTime = totalCVs * averageProcessingTimePerCV
		let timeElapsed = 0

		const controller = new AbortController()
		setAbortController(controller)

		const interval = setInterval(() => {
			if (controller.signal.aborted) {
				clearInterval(interval)
				setProgress(0)
				return
			}

			timeElapsed += 1
			const newProgress = Math.min((timeElapsed / totalTime) * 100, 100)
			setProgress(newProgress)
			setEstimatedTimeRemaining(Math.max(totalTime - timeElapsed, 0))

			if (totalCVs === 1) {
				setCurrentCV(1)
			} else {
				const currentIndex = Math.min(
					Math.floor((timeElapsed / totalTime) * totalCVs),
					totalCVs - 1,
				)
				setCurrentCV(currentIndex + 1)
			}

			if (newProgress >= 100) {
				clearInterval(interval)
			}
		}, 1000)

		try {
			const response = await uploadJobDescription(
				jobDescription,
				files,
				controller.signal,
			)
			clearInterval(interval)
			setProgress(100)
			setCurrentCV(totalCVs)
			return response
		} catch (error) {
			clearInterval(interval)
			if (error instanceof Error) {
				if (error.name === "AbortError") {
					console.log("Subida Cancelada")
					return null
				} else {
					throw new Error("Error al procesar los CVs. Intente nuevamente.")
				}
			} else {
				console.error("Error desconocido")
				return null
			}
		}
	}

	const cancelUpload = () => {
		if (abortController) {
			abortController.abort()
		}
	}

	return {
		progress,
		currentCV,
		estimatedTimeRemaining,
		upload,
		cancelUpload,
	}
}
