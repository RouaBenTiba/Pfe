"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const NextAuthProvider = (props: any) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};
