import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "./ui/alert-dialog";
import { Progress } from "./ui/progress";

interface ProgressDialogProps {
  open: boolean;
  progress: number;
  currentCV: number;
  totalCVs: number;
  estimatedTimeRemaining: number;
}
  
export function ProgressDialog({ open, progress, currentCV, totalCVs, estimatedTimeRemaining }: ProgressDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogTitle>Procesando {currentCV} de {totalCVs} CVs</AlertDialogTitle>
        <AlertDialogDescription>
          <p>Tiempo estimado restante: {estimatedTimeRemaining} segundos</p>
          <Progress value={progress} className="mt-4"/>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}