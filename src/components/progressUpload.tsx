import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogCancel,
} from "./ui/alert-dialog"
import { Progress } from "./ui/progress"
import Countdown from "react-countdown"

interface ProgressDialogProps {
	open: boolean
	progress: number
	currentCV: number
	totalCVs: number
	estimatedTimeRemaining: number
	cancelUpload: () => void
}

export function ProgressDialog({
	open,
	progress,
	currentCV,
	totalCVs,
	estimatedTimeRemaining,
	cancelUpload,
}: ProgressDialogProps) {
	if (!open) return null
	const CountdownRenderer = ({ hours, minutes, seconds }: any) => (
		<p>
			Tiempo estimado restante: {hours > 0 && `${hours} horas`}
			{hours > 0 && minutes > 0 && ", "}
			{minutes > 0 && `${minutes} minutos`}
			{(hours > 0 || minutes > 0) && seconds > 0 && ", "}
			{seconds > 0 && `${seconds} segundos`}
		</p>
	)

	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Procesando {currentCV} de {totalCVs} CVs
					</AlertDialogTitle>
					<AlertDialogDescription>
						<Countdown
							date={Date.now() + estimatedTimeRemaining * 1000}
							renderer={CountdownRenderer}
						/>
						<Progress value={progress} className="mt-4" />
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={cancelUpload}>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
