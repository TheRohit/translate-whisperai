"use client"

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TRequest, TValidator } from '@/lib/validators/transcribe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

const page = ({}) => {

  const { mutate:sendTranscribe, isLoading } = useMutation({
    mutationFn: async ({ ...form }: any) => {
      const payload: any = { ...form };
      const { data } = await axios.post(`/api/transcribe`, payload);
      return data;
      
    },
    onError: (err) => {
        if (err instanceof AxiosError) {
            if (err.response?.status === 409) {
              console.log(err);
            }
          }
          console.log(err);
          console.log(FormData)
    },
    onSuccess:() => 
    {    
      

        
        

    }
  });



  const form = useForm<TRequest>({
    resolver: zodResolver(TValidator),
    defaultValues: {
      prompt: "",
      model: "whisper-1",
      
      
    },
  });
  return <div className='flex flex-col m-4 items-center justify-center'>
    <div>
      <h1 className='text-4xl font-bold mt-8'>Transcription</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit((e) => sendTranscribe(e))} className="space-y-8">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter the Prompt</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can improve your transcription by adding a prompt
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="whisper-1">whisper-1</SelectItem>
                  
                </SelectContent>
              </Select>
              <FormDescription>
                Select a Model
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

    </div>

  </div>
}

export default page