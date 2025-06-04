"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createGameSchema } from '@repo/shared';
import { useCreateGame, useUpdateGame } from '@/features/games/api/use-games';
import type { Game } from '@/types/game';

export function GameForm({
  game,
  onSuccess,
}: {
  game?: Game;
  onSuccess?: () => void;
}) {
  const createMutation = useCreateGame();
  const updateMutation = useUpdateGame(game?.id ?? 0);
  const mutation = game ? updateMutation : createMutation;

  const form = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: game?.name ?? '',
      description: game?.description ?? '',
      logo: game?.logo ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof createGameSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {game ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
