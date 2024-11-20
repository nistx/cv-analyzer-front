import { useState } from "react"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Rating, Star } from "@smastrom/react-rating"
import {
	BriefcaseBusiness,
	Contact,
	GraduationCap,
	Languages,
	Mail,
	MessageSquareText,
	Phone,
	ScrollText,
	SquareChartGantt,
} from "lucide-react"
import "@smastrom/react-rating/style.css"
import { JobDescriptionResponse, CV } from "@/types/jobTypes"
import { useLocation } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import ConditionalSection from "@/components/ConditionalSection"
import { getDisplayValue } from "@/utils/helper"
import { DataTable } from "@/candidates/DataTable"
import { columns } from "@/candidates/columns"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const customStyles = {
	itemShapes: Star,
	activeFillColor: "white",
	activeBoxColor: "black",
	inactiveFillColor: "white",
	inactiveBoxColor: "#cdcdcd",
}

function App() {
	const location = useLocation()
	const { job_description, cvs } = location.state as JobDescriptionResponse

	const [selectedTab, setSelectedTab] = useState("qualified")
	const [selectedCandidate, setSelectedCandidate] = useState<CV>(cvs[0])

	const filteredCandidates = cvs.filter(
		candidate =>
			(selectedTab === "qualified") === candidate.qualification_status,
	)

	return (
		<div className="h-screen w-screen p-6 bg-background">
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[800px] rounded-lg border"
			>
				<ResizablePanel defaultSize={40}>
					<div className="flex flex-col h-full p-6">
						<Accordion className="mb-6" type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger>Oferta de Trabajo</AccordionTrigger>
								<AccordionContent>{job_description}</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Tabs defaultValue="qualified" onValueChange={setSelectedTab}>
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="qualified">Calificado</TabsTrigger>
								<TabsTrigger value="disqualified">Descalificado</TabsTrigger>
							</TabsList>
						</Tabs>

						<div className="mt-6 flex-grow">
							<DataTable
								columns={columns}
								data={filteredCandidates}
								setSelectedCandidate={setSelectedCandidate}
							/>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={60}>
					<div className="p-6 h-full">
						<div className="flex items-start gap-4 mb-6">
							<Avatar className="h-16 w-16">
								<AvatarImage src="" />
								<AvatarFallback>
									{selectedCandidate?.personal_data?.name
										.split(" ")
										.map(n => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="flex-grow">
								<h2 className="text-2xl font-bold">
									{selectedCandidate?.personal_data?.name}
								</h2>
								<p className="text-muted-foreground">
									{selectedCandidate?.personal_data?.role}
								</p>
								<div className="flex items-center gap-5 mt-1 mb-2">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Phone className="h-4 w-4" />
										<span>{selectedCandidate?.personal_data?.phone}</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Mail className="h-4 w-4" />
										<span>{selectedCandidate?.personal_data?.email}</span>
									</div>
								</div>
								<Rating
									value={selectedCandidate?.ranking}
									readOnly
									style={{ maxWidth: 150 }}
									itemStyles={customStyles}
									radius="medium"
									spaceInside="large"
									spaceBetween="small"
								/>
							</div>
						</div>

						<ScrollArea className="h-full pr-6">
							<Alert>
								<MessageSquareText className="h-4 w-4" />
								<AlertTitle>Resumen del Candidato</AlertTitle>
								<AlertDescription>
									{selectedCandidate?.justification}
								</AlertDescription>
							</Alert>

							{/* HABILIDADES TÉCNICAS */}
							<ConditionalSection
								title="Habilidades Técnicas"
								data={selectedCandidate?.skills?.filter(
									skill => skill.type === "technical",
								)}
							>
								<div className="flex flex-wrap gap-2">
									{selectedCandidate?.skills
										.filter(
											skill =>
												skill.type === "technical" &&
												skill.status === "present",
										)
										.map(skill => <Badge key={skill.name}>{skill.name}</Badge>)}
								</div>
							</ConditionalSection>

							{/* HABILIDADES BLANDAS */}
							<ConditionalSection
								title="Habilidades Blandas"
								data={selectedCandidate?.skills?.filter(
									skill => skill.type === "soft",
								)}
							>
								<div className="flex flex-wrap gap-2">
									{selectedCandidate?.skills
										.filter(
											skill =>
												skill.type === "soft" && skill.status === "present",
										)
										.map(skill => (
											<Badge variant="outline" key={skill.name}>
												{skill.name}
											</Badge>
										))}
								</div>
							</ConditionalSection>

							{/* PERFIL */}
							<ConditionalSection
								icon={<Contact className="h-5 w-5" />}
								title="Perfil"
								data={selectedCandidate?.profile_summary}
							>
								<p className="text-muted-foreground">
									{selectedCandidate?.profile_summary}
								</p>
								<Separator className="my-6" />
							</ConditionalSection>

							{/* EXPERIENCIA */}
							<ConditionalSection
								icon={<BriefcaseBusiness className="h-5 w-5" />}
								title="Experiencia"
								data={selectedCandidate?.experience}
							>
								{selectedCandidate?.experience?.map((exp, index) => (
									<div key={index} className="mb-4">
										<p className="underline underline-offset-4">
											<strong>{getDisplayValue(exp.company)}</strong>
										</p>
										<p className="flex items-center justify-between font-semibold">
											{getDisplayValue(exp.position)}
											<div className="text-end">
												{getDisplayValue(exp.start_date)}
												{" - "}
												{getDisplayValue(exp.end_date)}
											</div>
										</p>
										<p className="text-muted-foreground">{exp.description}</p>
									</div>
								))}
								<Separator className="my-6" />
							</ConditionalSection>

							{/* EDUCACIÓN */}
							<ConditionalSection
								icon={<GraduationCap className="h-5 w-5" />}
								title="Educación"
								data={selectedCandidate?.education}
							>
								{selectedCandidate?.education?.map((edu, index) => (
									<div key={index} className="mb-4">
										<p className="flex items-center justify-between font-semibold">
											{getDisplayValue(edu.institution)}
											<div className="text-end">
												{getDisplayValue(edu.start_date)}
												{" - "}
												{getDisplayValue(edu.graduation_date)}
											</div>
										</p>
										<p className="text-muted-foreground">{edu.achievements}</p>
									</div>
								))}
								<Separator className="my-6" />
							</ConditionalSection>

							{/* CERTIFICACIÓN */}
							<ConditionalSection
								icon={<ScrollText className="h-5 w-5" />}
								title="Certificaciones"
								data={selectedCandidate?.certifications}
							>
								{selectedCandidate?.certifications?.map((cer, index) => (
									<div key={index} className="mb-2">
										<p className="flex items-center justify-between text-muted-foreground">
											{getDisplayValue(cer.certification)}
											<div className="text-end font-semibold text-black">
												{getDisplayValue(cer.date_obtained)}
											</div>
										</p>
									</div>
								))}
								<Separator className="my-6" />
							</ConditionalSection>

							{/* IDIOMAS */}
							<ConditionalSection
								icon={<Languages className="h-5 w-5" />}
								title="Idiomas"
								data={selectedCandidate?.languages}
							>
								{selectedCandidate?.languages?.map((lang, index) => (
									<div key={index} className="mb-2 text-muted-foreground">
										<p className="flex items-center justify-between">
											{getDisplayValue(lang.language)}
											<div className="text-end font-semibold">
												{getDisplayValue(lang.proficiency)}
											</div>
										</p>
									</div>
								))}
								<Separator className="my-6" />
							</ConditionalSection>

							{/* PROYECTOS */}
							<ConditionalSection
								icon={<SquareChartGantt className="h-5 w-5" />}
								title="Proyectos"
								data={selectedCandidate?.projects}
							>
								{selectedCandidate?.projects?.map((pj, index) => (
									<div key={index} className="mb-4">
										<p className="flex items-center justify-between font-semibold">
											{getDisplayValue(pj.name)}
										</p>
										<p className="text-muted-foreground">{pj.description}</p>
									</div>
								))}
								<Separator className="my-6" />
							</ConditionalSection>

							<div className="h-[150px]"></div>
						</ScrollArea>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}

export default App
