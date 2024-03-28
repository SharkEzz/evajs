import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trpc } from '@/trpc';
import { LoaderCircle, Plus } from 'lucide-react';

export function PastSessionsCard() {
  const { data: pastSessions, isLoading: isPastSessionsLoading } = trpc.sessions.findPastSessions.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <p>
            Dernières sessions
            {isPastSessionsLoading && <LoaderCircle className="animate-spin" />}
          </p>
          <Button className="gap-2">
            <Plus size={18} />
            Compte-rendu de session
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
            {pastSessions?.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{new Date(session.date).toLocaleString()}</TableCell>
                <TableCell>{session.players.length} joueurs</TableCell>
              </TableRow>
            ))}
            {pastSessions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Aucune session passée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
