import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/trpc';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Player {
  firstName: string;
  lastName: string;
  username: string;
  playerTag: string;
  isJVS: boolean;
  bestDamageInflicted: number;
  bestKillStreak: number;
}

export function CreatePlayerDialog() {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const form = useForm<Player>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      isJVS: false,
      bestDamageInflicted: 0,
      bestKillStreak: 0,
      playerTag: '',
    },
  });
  const createPlayer = trpc.players.create.useMutation();

  const handleSubmit = async (data: Player) => {
    await createPlayer.mutateAsync(data);
    await utils.players.findAll.invalidate();
    form.reset();
    toast({
      title: 'Succès',
      description: 'Joueur ajouté avec succès',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} />
          Nouveau joueur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouveau joueur</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="firstName"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Prénom*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nom*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Pseudo*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="playerTag"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Joueur#12345" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isJVS"
              render={({ field: { name, ref, onChange } }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name={name}
                    ref={ref}
                    onCheckedChange={(c) => {
                      onChange(!!c);
                    }}
                    id="isJVS"
                  />
                  <label htmlFor="isJVS">Interne à l&apos;entreprise</label>
                </div>
              )}
            />
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="bestDamageInflicted"
                rules={{ min: 0, required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max. de dommages infligés*</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bestKillStreak"
                rules={{ min: 0, required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Meilleure série d&apos;éliminations*</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Valider</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
