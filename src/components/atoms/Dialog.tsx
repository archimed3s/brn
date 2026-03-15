"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

const defaultBackdropClassName =
  "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const defaultViewportClassName =
  "fixed inset-0 z-[100] flex items-start justify-center overflow-hidden p-4 sm:items-center";

const defaultPopupClassName = cn(
  "flex max-h-[min(90vh,calc(100vh-2rem))] w-full min-w-0 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-[#E9EAEB] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] sm:max-w-md sm:p-6",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
);

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Backdrop>) => (
  <DialogPrimitive.Backdrop
    className={cn(defaultBackdropClassName, className)}
    {...props}
  />
);

const Viewport = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Viewport>) => (
  <DialogPrimitive.Viewport
    className={cn(defaultViewportClassName, className)}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Popup>) => (
  <DialogPrimitive.Popup
    className={cn(defaultPopupClassName, className)}
    {...props}
  />
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn("text-2xl font-semibold leading-8 text-[#0D1017]", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn("text-sm font-normal leading-5 text-[#98A2B3]", className)}
    {...props}
  />
);

const Close = (props: React.ComponentProps<typeof DialogPrimitive.Close>) => (
  <DialogPrimitive.Close {...props} />
);

export const Dialog = {
  Root: DialogPrimitive.Root,
  Portal: DialogPrimitive.Portal,
  Backdrop,
  Viewport,
  Popup,
  Title,
  Description,
  Close,
};
