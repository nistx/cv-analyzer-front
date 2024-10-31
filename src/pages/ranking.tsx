import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Rating, Star } from '@smastrom/react-rating';
import { Mail, Phone } from 'lucide-react';
import '@smastrom/react-rating/style.css';
import { JobDescriptionResponse, CV } from '@/types/jobTypes';

import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const customStyles = {
  itemShapes: Star,
  activeFillColor: 'white',
  activeBoxColor: 'black',
  inactiveFillColor: 'white',
  inactiveBoxColor: '#cdcdcd',
};


function App() {
  const location = useLocation();
  const { cvs } = (location.state as JobDescriptionResponse);

  const [selectedTab, setSelectedTab] = useState('qualified');
  const [selectedCandidate, setSelectedCandidate] = useState<CV | null>(cvs[0] || null);

  const filteredCandidates = cvs.filter(
    (candidate) => (selectedTab === 'qualified') === candidate.qualification_status
  );

  return (
    <div className="h-screen w-screen p-6 bg-background">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px] rounded-lg border">
        <ResizablePanel defaultSize={40}>
          <div className="flex flex-col h-full p-6">
            <Tabs defaultValue="qualified" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qualified">Calificado</TabsTrigger>
                <TabsTrigger value="disqualified">Descalificado</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="mt-6 flex-grow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow 
                      key={candidate.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <TableCell>{candidate.personal_data?.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{candidate.personal_data?.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Rating 
                          value={candidate.ranking} 
                          readOnly 
                          style={{ maxWidth: 100 }}
                          itemStyles={customStyles}
                          radius="medium"
                          spaceInside="large"
                          spaceBetween="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={60}>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback>{selectedCandidate?.personal_data?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold">{selectedCandidate?.personal_data?.name}</h2>
                <p className="text-muted-foreground">{selectedCandidate?.personal_data?.role}</p>
                <div className='flex items-center gap-5 mt-1 mb-2'>
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
            
          <ScrollArea className="h-[800px] pr-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Habilidades Técnicas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate?.skills
                    .filter(skill => skill.type === 'technical')
                    .map((skill) => (
                      <Badge>{skill.name}</Badge>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Habilidades Blandas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate?.skills
                    .filter(skill => skill.type === 'soft')
                    .map((skill) => (
                      <Badge variant="outline">{skill.name}</Badge>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Perfil</h3>
              <p className="text-muted-foreground">{selectedCandidate?.profile_summary}</p>
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Experiencia</h3>
              {selectedCandidate?.experience?.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="text-muted-foreground">
                  <strong>{exp.company}</strong> - {exp.position}
                  </p>
                  <p className="text-muted-foreground">
                    {exp.start_date} {exp.end_date ? `- ${exp.end_date}` : ''}
                  </p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Educación</h3>
              {selectedCandidate?.education?.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="text-muted-foreground">
                  <strong>{exp.institution}</strong> - {exp.degree}
                  </p>
                  <p className="text-muted-foreground">
                    {exp.start_date} {exp.start_date ? `- ${exp.graduation_date}` : ''}
                  </p>
                  <p className="text-muted-foreground">{exp.achievements}</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Certificaciones</h3>
              {selectedCandidate?.certifications?.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="text-muted-foreground">
                    {exp.certification} {exp.certification ? `- ${exp.date_obtained}` : ''}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />


          </ScrollArea>

          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;