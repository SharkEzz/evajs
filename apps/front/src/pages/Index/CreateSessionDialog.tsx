import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/trpc';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function CreateSessionDialog() {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const createSession = trpc.sessions.create.useMutation();

  const form = useForm<{ date: string }>({
    defaultValues: {
      date: '',
    },
  });

  const handleSubmit = async (data: { date: string }) => {
    await createSession.mutateAsync({ date: new Date(data.date).toISOString() });
    await utils.sessions.findIncomingSessions.invalidate();
    form.reset();
    toast({
      title: 'Succès',
      description: 'Session créée avec succès',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} />
          Nouvelle session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="date"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Date de la session*</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Valider</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
