import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Terminal, Upload } from "lucide-react"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useJobUpload } from "@/hooks/use-JobUpload"
import { ProgressDialog } from "@/components/progressUpload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function JobDescriptionUpload() {
	const [jobDescription, setJobDescription] = useState("")
	const [files, setFiles] = useState<FileList | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState({ jobDescription: "", files: "" })
	const navigate = useNavigate()
	const { toast } = useToast()

	const { progress, currentCV, estimatedTimeRemaining, upload, cancelUpload } =
		useJobUpload(jobDescription, files)
	const [showProgressDialog, setShowProgressDialog] = useState(false)

	const validateInputs = useCallback((): boolean => {
		const newErrors = { jobDescription: "", files: "" }

		if (!jobDescription.trim()) {
			newErrors.jobDescription = "Ingrese una oferta laboral."
		}
		if (!files || files.length === 0) {
			newErrors.files = "Ingrese al menos un currículum."
		} else {
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				if (file.type !== "application/pdf") {
					newErrors.files = "Solo se permiten archivos PDF."
					break
				}
			}
		}
		setErrors(newErrors)
		return !newErrors.jobDescription && !newErrors.files
	}, [jobDescription, files])

	const handleSubmit = useCallback(async () => {
		if (!validateInputs()) return

		setIsSubmitting(true)
		setShowProgressDialog(true)

		try {
			const data = await upload()
			if (data) {
				navigate("/ranking", { state: data })
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Error de red. Por favor, verifique su conexión."
			toast({
				variant: "destructive",
				title: "Error",
				description: errorMessage,
			})
		} finally {
			setIsSubmitting(false)
			setShowProgressDialog(false)
		}
	}, [validateInputs, upload, navigate, toast])

	return (
		<div className="h-screen flex flex-col">
			<div className="flex flex-grow">
				<div className="w-1/2 bg-black flex items-start">
					<div className="px-[20vh] text-white mt-[15vh]">
						<p className="font-bold text-[40px] leading-[1] mb-10">
							Encuentra el candidato perfecto con{" "}
							<span className="text-[#00FFAB]">IA</span>
						</p>
						<Alert>
							<Terminal className="h-4 w-4" />
							<AlertTitle>Acelera tu búsqueda de talento!</AlertTitle>
							<AlertDescription>
								Sube tu oferta y CVs, y obtén el ranking de candidatos ideal.
							</AlertDescription>
						</Alert>
					</div>

					<div className="absolute inset-y-0 left-0 right-1/2 pointer-events-none">
						<spline-viewer url="https://prod.spline.design/2j-C11IhAnOgMg1v/scene.splinecode"></spline-viewer>
					</div>
				</div>
				<div className="w-1/2 flex flex-col p-4 py-20 px-20">
					<Textarea
						placeholder="Ingrese oferta laboral..."
						className="flex-grow mb-2"
						value={jobDescription}
						onChange={e => setJobDescription(e.target.value)}
					/>
					{errors.jobDescription && (
						<p className="text-red-500 text-sm mb-4">{errors.jobDescription}</p>
					)}

					<Input
						type="file"
						multiple
						accept=".pdf"
						onChange={e => setFiles(e.target.files)}
						className="mb-2"
					/>
					{errors.files && (
						<p className="text-red-500 text-sm mb-4">{errors.files}</p>
					)}

					<Button
						onClick={handleSubmit}
						className="w-full"
						disabled={isSubmitting}
					>
						<Upload className="mr-2 h-4 w-4" />
						{isSubmitting ? "Enviando..." : "Rank CVs"}
					</Button>
				</div>
			</div>

			<ProgressDialog
				open={showProgressDialog}
				totalCVs={files?.length || 0}
				progress={progress}
				currentCV={currentCV}
				estimatedTimeRemaining={estimatedTimeRemaining}
				cancelUpload={cancelUpload}
			/>
		</div>
	)
}

export default JobDescriptionUpload
