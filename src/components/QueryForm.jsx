import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  query: z.string().min(10, { message: "Query must be at least 10 characters long" }).max(500, { message: "Query must not exceed 500 characters" }),
});

const QueryForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const handleSubmit = (values) => {
    onSubmit(values.query);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter your query here..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Processing...' : 'Submit Query'}
        </Button>
      </form>
    </Form>
  );
};

export default QueryForm;
