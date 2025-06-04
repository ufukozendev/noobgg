"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createPlatformSchema, updatePlatformSchema } from '@repo/shared';
import { useCreatePlatform, useUpdatePlatform } from '@/features/platforms/api/use-platforms';
import type { Platform } from '@/types/platform';

export function PlatformForm({
  platform,
  onSuccess,
}: {
  platform?: Platform;
  onSuccess?: () => void;
}) {
  const createMutation = useCreatePlatform();
  const updateMutation = useUpdatePlatform(platform?.id ?? 0);
  const mutation = platform ? updateMutation : createMutation;

  const form = useForm<z.infer<typeof createPlatformSchema>>({
    resolver: zodResolver(platform ? updatePlatformSchema : createPlatformSchema),
    defaultValues: { name: platform?.name ?? '' },
  });

  function onSubmit(values: z.infer<typeof createPlatformSchema>) {
    mutation.mutate(values, { onSuccess });
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
        <Button type="submit" disabled={mutation.isPending}>
          {platform ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
