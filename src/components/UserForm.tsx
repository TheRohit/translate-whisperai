"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/Input";
import Link from "next/link";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { LinkRequest, LinkValidator } from "@/lib/validators/link";
import axios, { AxiosError } from "axios";

import {useRouter} from "next/navigation" 

const UserForm = ({}) => {
  const router = useRouter()

  const form = useForm<LinkRequest>({
    resolver: zodResolver(LinkValidator),
    defaultValues: {
      url: "",
    },
  });

  //submit handler

  const { mutate:sendURL, isLoading } = useMutation({
    mutationFn: async ({ url }: LinkRequest) => {
      const payload: LinkRequest = { url };
      const { data } = await axios.post(`/api/yt`, payload);
      return data;
      
    },
    onError: (err) => {
        if (err instanceof AxiosError) {
            if (err.response?.status === 409) {
              console.log(err);
            }
          }
    },
    onSuccess:() => 
    {     //api call 2
        // const name = "./tmp/"+ "audio" + ".mp3"
      // router.push("/transcribe")

        
        

    }
  });

  return (


    <Form {...form}>
      <form onSubmit={form.handleSubmit((e) => sendURL(e))} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter the YouTube link</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="...youtube link"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the YouTube link of the video
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UserForm;
