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
import { ScrollArea } from "@/components/ui/Scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/Textarea";
import { TRequest, TValidator } from "@/lib/validators/transcribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";

const page = ({}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [response, setResponse] = useState("");
  const [translate, setTranslate] = useState(true);
  const [translateloading, setTranslateLoading] = useState(false);
  const [language, setLanguage] = useState("english");

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
      setResponse(data.data);
      setProcessing(false);
    },
  });

  //translate
  //send axios request
  const handleTranslate = async () => {
    setTranslateLoading(true);
    try {
      const { data } = await axios.post('/api/translate', { /* payload */ });
      setResponse(data.data);
    } catch (error) {
      console.error(error);
    } finally {

      setTranslateLoading(false);
    }
  };

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
        <h1 className=" flex flex-col text-6xl font-bold mt-8 items-center">
          Transcription
        </h1>
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
              <Textarea
                name="transcription"
                className="h-96"
                value={response}
                onChange={(e) => {
                  
                }}
               
              ></Textarea>
            </div>
            
            <div className="flex items-center justify-center">
            <Button
                className="m-3 "
                variant={"outline"}
                onClick={() => router.push("/")}
              >
                <ArrowLeft />
              </Button>
              <div className="mx-3">
              <Select 
               
               onValueChange={(value) => {
                 setLanguage(value);
               }}
               defaultValue="english"
               name="language"
             >
               <SelectTrigger>
                 <SelectValue placeholder="Choose a response type." />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="english">English</SelectItem>
               </SelectContent>
             </Select>
              </div>
            <Button type="submit" onClick={handleTranslate} isLoading={translateloading} >
              Translate
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
