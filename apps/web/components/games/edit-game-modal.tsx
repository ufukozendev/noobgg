"use client";
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Save, Edit, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
import { useUpdateGame } from '@/features/games/api/use-games';
import type { Game } from '@/types/game';

interface EditGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game | null;
}

export function EditGameModal({ open, onOpenChange, game }: EditGameModalProps) {
  const updateMutation = useUpdateGame(game?.id ?? 0);

  const form = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: game?.name ?? '',
      description: game?.description ?? '',
      logo: game?.logo ?? '',
    },
  });

  // Update form values when game changes
  React.useEffect(() => {
    if (game) {
      form.reset({
        name: game.name,
        description: game.description ?? '',
        logo: game.logo ?? '',
      });
    }
  }, [game, form]);

  function onSubmit(values: z.infer<typeof createGameSchema>) {
    if (!game) return;
    
    updateMutation.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  const logoUrl = form.watch('logo');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Game</span>
            </DialogTitle>
            <DialogDescription>
              Update "{game?.name}" details
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div 
                className="grid gap-4 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Name</FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              value={field.value ?? ''} 
                              placeholder="Enter game name..."
                            />
                          </motion.div>
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
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              value={field.value ?? ''} 
                              placeholder="Enter game description..."
                            />
                          </motion.div>
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
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              value={field.value ?? ''} 
                              placeholder="https://example.com/logo.png"
                            />
                          </motion.div>
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
                      <AnimatePresence mode="wait">
                        {logoUrl ? (
                          <motion.div 
                            key="logo-preview"
                            className="flex flex-col items-center space-y-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
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
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="logo-placeholder"
                            className="flex flex-col items-center space-y-2 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ImageIcon className="h-8 w-8" />
                            <span className="text-xs text-center">Logo preview will appear here</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-end space-x-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button 
                    type="submit" 
                    disabled={updateMutation.isPending}
                    className="min-w-[120px]"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Game
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}