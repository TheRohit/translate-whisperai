"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRequest, TValidator } from "@/lib/validators/transcribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const page = ({}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [response, setResponse] = useState("");

const router = useRouter();

  const { mutate: sendTranscribe, isLoading } = useMutation({
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
    },
    onSuccess: (data) => {
      setResponse(data.data.text);
      setProcessing(false);
    },
  });

  const form = useForm<TRequest>({
    resolver: zodResolver(TValidator),
    defaultValues: {
      prompt: "",
      model: "whisper-1",
    },
  });
  console.log(response);
  return (
    <div className="flex flex-col m-4 items-center justify-center ">
      <div>
        <h1 className=" flex flex-col text-6xl font-bold mt-8 items-center">Transcription</h1>
        {processing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((e) => sendTranscribe(e))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the Prompt</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" placeholder="..." {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="whisper-1">whisper-1</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select a Model</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isLoading} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        ) : (
          <div>
             <div className="flex flex-col justify-center items-center mt-20 border-black border-2 border-dashed mx-5 md:max-w-4xl">
            <p className="m-5 items-center font-mono">
              {/* {JSON.stringify(response)} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Commodo quis imperdiet massa tincidunt nunc pulvinar sapien.
              Aliquam sem fringilla ut morbi tincidunt. Commodo elit at
              imperdiet dui accumsan sit amet. Tellus id interdum velit laoreet
              id donec.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Commodo quis imperdiet massa tincidunt nunc pulvinar sapien.
              Aliquam sem fringilla ut morbi tincidunt. Commodo elit at
              imperdiet dui accumsan sit amet. Tellus id interdum velit laoreet
              id donec.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Commodo quis imperdiet massa tincidunt nunc pulvinar sapien.
              Aliquam sem fringilla ut morbi tincidunt. Commodo elit at
              imperdiet dui accumsan sit amet. Tellus id interdum velit laoreet
              id donec.
            </p>
           
            
            
          </div>
          <div className="items-center flex justify-center mt-2">
            <Button className="m-3 " variant={"outline"}  onClick={() => router.push('/') }>Try Again</Button>
            <Button className="m-3 " onClick={() => router.push('/') }>Translate</Button>
            </div>
          </div>
         
          
        )}
        
      </div>
    </div>
  );
};

export default page;
