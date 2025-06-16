"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Save, ImageIcon } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { createGameSchema } from '@repo/shared';
import { useCreateGame } from '@/features/games/api/use-games';

interface AddGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGameModal({ open, onOpenChange }: AddGameModalProps) {
  const createMutation = useCreateGame();

  const form = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: '',
      description: '',
      logo: '',
    },
  });

  function onSubmit(values: z.infer<typeof createGameSchema>) {
    createMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }

  const logoUrl = form.watch('logo');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Add New Game</span>
          </DialogTitle>
          <DialogDescription>
            Create a new game entry for your library
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
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
                  <div className="mt-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
                    {logoUrl ? (
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={logoUrl} 
                          alt="Game logo preview" 
                          className="h-20 w-20 rounded-lg object-cover shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden flex-col items-center space-y-1 text-muted-foreground">
                          <ImageIcon className="h-6 w-6" />
                          <span className="text-xs">Invalid image URL</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-xs text-center">Logo preview will appear here</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={createMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
                className="min-w-[120px]"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Game
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}