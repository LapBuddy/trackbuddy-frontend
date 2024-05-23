"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../../app/navbar/navbar-menu";
import { BentoGrid, BentoGridItem } from "../../app/bentoGrid/bento-grid";
import FileUploader from "../../app/sheetJS/FileUploader";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { LampDemo } from "@/app/lamp/lamp";
import { cn } from "@/app/utils/cn";
import { InfiniteMovingCards } from "@/app/moving-cards/infinite-moving-cards";
import { postLogout } from "@/api/auth";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <div>
      <Navbar className="top-2" />
      <LampDemo />
      <FileUploader />
      <br />

      {/*       TODO use bento grid to display the car setups or something */}
       <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid> 

      <h1
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text 
       text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl mb-4"
      >
        Interesting topics
      </h1>

      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
      <br />

    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const testimonials = [
  //these props can we changed to be dynamic with an API call, these items are for the infinite carousel
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const items = [
  //these props can we changed to be dynamic with an API call, these items are for the BentoGrid
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isBrowser = typeof window !== "undefined";
  const token = isBrowser ? localStorage.getItem("token") : null;

  const logout = async () => {
    const res = await postLogout(enqueueSnackbar);
    if (res.status == 200) {
      router.push("/authentication/signin");
    }
  };
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <HoveredLink href="/">Home</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Setups">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/setups/view">View Setups</HoveredLink>
            {token && (
              <HoveredLink href="/setups/create">Create Setup</HoveredLink>
            )}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">

            {token && (
              <HoveredLink href="/authentication/profile">
                My Account
              </HoveredLink>
            )}
            {token == null && (
              <HoveredLink href="/authentication/signin">Log in</HoveredLink>
            )}
            <HoveredLink href="/authentication/signup">
              Create an account
            </HoveredLink>
            {token && (
              <HoveredLink href="/" onClick={logout}>
                Logout
              </HoveredLink>
            )}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
