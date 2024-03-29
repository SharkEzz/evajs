import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trpc } from '@/trpc';
import { LoaderCircle } from 'lucide-react';
import { CreatePlayerDialog } from './CreatePlayerDialog';

export function PlayersCard() {
  const { data: users, isLoading: isUsersLoading } = trpc.players.findAll.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <p>
            Joueurs
            {isUsersLoading && <LoaderCircle className="animate-spin" />}
          </p>
          <CreatePlayerDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pseudo</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Interne à l&apos;entreprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.playerTag}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.isJVS ? 'Oui' : 'Non'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
