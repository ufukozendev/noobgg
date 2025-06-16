"use client";
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Save, Edit, Trophy, ImageIcon } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createGameRankSchema } from '@repo/shared';
import { useUpdateGameRank } from '@/features/gameranks/api/use-gameranks';
import { useGames } from '@/features/games/api/use-games';
import type { GameRank } from '@/types/gamerank';

interface EditGameRankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gamerank: GameRank | null;
}

export function EditGameRankModal({ open, onOpenChange, gamerank }: EditGameRankModalProps) {
  const updateMutation = useUpdateGameRank(gamerank?.id ?? 0);
  const { data: gamesData } = useGames();

  const form = useForm<z.infer<typeof createGameRankSchema>>({
    resolver: zodResolver(createGameRankSchema),
    defaultValues: {
      name: gamerank?.name ?? '',
      image: gamerank?.image ?? '',
      order: gamerank?.order ?? 0,
      gameId: gamerank?.gameId ?? 1,
    },
  });

  // Update form values when gamerank changes
  React.useEffect(() => {
    if (gamerank) {
      form.reset({
        name: gamerank.name,
        image: gamerank.image ?? '',
        order: gamerank.order,
        gameId: gamerank.gameId,
      });
    }
  }, [gamerank, form]);

  function onSubmit(values: z.infer<typeof createGameRankSchema>) {
    if (!gamerank) return;
    
    updateMutation.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  const imageUrl = form.watch('image');

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
              <span>Edit Game Rank</span>
            </DialogTitle>
            <DialogDescription>
              Update "{gamerank?.name}" details
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
                        <FormLabel>Rank Name</FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              value={field.value ?? ''} 
                              placeholder="Enter rank name..."
                            />
                          </motion.div>
                        </FormControl>
                        <FormDescription>
                          The display name for this rank
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              value={field.value ?? ''} 
                              placeholder="https://example.com/rank.png"
                            />
                          </motion.div>
                        </FormControl>
                        <FormDescription>
                          URL to the rank's image
                        </FormDescription>
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
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input 
                              {...field} 
                              type="number"
                              value={field.value ?? 0}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              placeholder="Enter order..."
                            />
                          </motion.div>
                        </FormControl>
                        <FormDescription>
                          Display order of this rank
                        </FormDescription>
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
                        <Select 
                          onValueChange={(value) => field.onChange(Number(value))} 
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a game" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {gamesData?.map((game) => (
                              <SelectItem key={game.id} value={game.id.toString()}>
                                {game.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The game this rank belongs to
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <FormLabel>Image Preview</FormLabel>
                    <div className="mt-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
                      <AnimatePresence mode="wait">
                        {imageUrl ? (
                          <motion.div 
                            key="image-preview"
                            className="flex flex-col items-center space-y-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img 
                              src={imageUrl} 
                              alt="Rank image preview" 
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
                            key="image-placeholder"
                            className="flex flex-col items-center space-y-2 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Trophy className="h-8 w-8" />
                            <span className="text-xs text-center">Rank image preview will appear here</span>
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
                        Update Rank
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