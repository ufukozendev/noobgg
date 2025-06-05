"use client";
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createGameRankSchema, updateGameRankSchema } from '@repo/shared';
import { useCreateGameRank, useUpdateGameRank } from '@/features/gameranks/api/use-gameranks';
import { useGames } from '@/features/games/api/use-games';
import type { GameRank } from '@/types/gamerank';

type FormData = z.infer<typeof createGameRankSchema>;

export function GameRankForm({
  gamerank,
  onSuccess,
}: {
  gamerank?: GameRank;
  onSuccess?: () => void;
}) {
  const createMutation = useCreateGameRank();
  const updateMutation = useUpdateGameRank(gamerank?.id ?? 0);
  const { data: gamesData } = useGames();

  const form = useForm<FormData>({
    resolver: zodResolver(createGameRankSchema),
    defaultValues: { 
      name: gamerank?.name ?? '',
      image: gamerank?.image ?? '',
      order: gamerank?.order ?? 0,
      gameId: gamerank?.gameId ?? 1,
    },
  });

  function onSubmit(values: FormData) {
    if (gamerank) {
      updateMutation.mutate(values, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gameId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game</FormLabel>
              <FormControl>
                <select 
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                >
                  <option value="">Select a game</option>
                  {gamesData?.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          {gamerank ? 'Update' : 'Create'} Game Rank
        </Button>
      </form>
    </Form>
  );
}
