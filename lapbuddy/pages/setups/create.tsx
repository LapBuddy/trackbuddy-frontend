"use client";
import React from "react";
import { cn } from '@/app/utils/cn';
import { Label } from "@/app/login/label";
import { Input } from "@/app/login/input";
import "./setups.css";
import { postSetup } from "@/api/setups";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function SetupForm() {
  const [name, setName] = React.useState("");
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [tires, setTires] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [suspension, setSuspension] = React.useState("");
  const [other, setOther] = React.useState("");

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postSetup(name, make, model, year, tires, pressure, suspension, other, enqueueSnackbar);
    if (res.status == 201) {
        router.push('/setups/view');
    }
  };
  return (
<div className="max-w-md w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create New Setup
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Setups include car specifications that relate to the lap data that is uploaded to LapBuddy.

      </p>

      <form className="my-8" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Shannonville Setup" type="text" value={name}
            onChange={(e) => setName(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="make">Make</Label>
            <Input id="make" placeholder="Toyota" type="text" value={make}
            onChange={(e) => setMake(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="86" type="text" value={model}
            onChange={(e) => setModel(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="year">Year</Label>
            <Input id="year" placeholder="2015" type="text" value={year}
            onChange={(e) => setYear(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="tires">Tires</Label>
          <Input id="tires" placeholder="Firehawk Indy 500" type="text" value={tires}
            onChange={(e) => setTires(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="pressure">Tire Pressure</Label>
          <Input id="pressure" placeholder="33 psi" type="text" value={pressure}
            onChange={(e) => setPressure(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="suspension">Suspension</Label>
          <Input id="suspension" placeholder="Tein Flex Z" type="text" value={suspension}
            onChange={(e) => setSuspension(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="other">Other Details</Label>
          <Input id="other" placeholder="Turbo Kit..." type="text" value={other}
            onChange={(e) => setOther(e.target.value)}/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Create Setup &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
