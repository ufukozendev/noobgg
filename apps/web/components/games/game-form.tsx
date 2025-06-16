"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Save, X, ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createGameSchema } from '@repo/shared';
import { useCreateGame, useUpdateGame } from '@/features/games/api/use-games';
import type { Game } from '@/types/game';

interface GameFormProps {
  game?: Game;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function GameForm({ game, onSuccess, onCancel }: GameFormProps) {
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

  const logoUrl = form.watch('logo');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5" />
          <span>{game ? 'Edit Game' : 'Create New Game'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value ?? ''} 
                          placeholder="Enter game name..."
                          className="h-10"
                        />
                      </FormControl>
                      <FormDescription>
                        The display name for your game
                      </FormDescription>
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
                        <Input 
                          {...field} 
                          value={field.value ?? ''} 
                          placeholder="Enter game description..."
                          className="h-10"
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of the game
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value ?? ''} 
                          placeholder="https://example.com/logo.png"
                          className="h-10"
                        />
                      </FormControl>
                      <FormDescription>
                        URL to the game's logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <FormLabel>Logo Preview</FormLabel>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8">
                    {logoUrl ? (
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={logoUrl} 
                          alt="Game logo preview" 
                          className="h-24 w-24 rounded-lg object-cover shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden flex-col items-center space-y-1 text-muted-foreground">
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-sm">Invalid image URL</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                        <ImageIcon className="h-12 w-12" />
                        <span className="text-sm">Logo preview will appear here</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t">
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  disabled={mutation.isPending}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="min-w-[120px]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {game ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {game ? 'Update Game' : 'Create Game'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
