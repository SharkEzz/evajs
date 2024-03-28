import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trpc } from '@/trpc';
import { LoaderCircle, Plus } from 'lucide-react';

export function IncomingSessionsCard() {
  const { data: incomingSessions, isLoading: isIncomingSessionsLoading } =
    trpc.sessions.findIncomingSessions.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <p>
            Sessions à venir
            {isIncomingSessionsLoading && <LoaderCircle className="animate-spin" />}
          </p>
          <Button className="gap-2">
            <Plus size={18} />
            Nouvelle session
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nombre de joueurs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomingSessions?.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{new Date(session.date).toLocaleString()}</TableCell>
                <TableCell>{session.players.length} joueurs</TableCell>
              </TableRow>
            ))}
            {incomingSessions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Aucune session à venir
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
