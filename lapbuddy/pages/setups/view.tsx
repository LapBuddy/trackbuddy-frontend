"use client";
import React, { useEffect } from 'react';
import "./setups.css";
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { getSetups } from '@/api/setups';
import { BentoGrid, BentoGridItem } from '@/app/bentoGrid/bento-grid';
import { Navbar } from '../home/home';

export default function Setups() {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [setups, setSetups] = React.useState<any>(null);

  const handleClick = () => {
    router.push('/setups/create');
  }

  const stringify = (setup: { name?: string | number | bigint | boolean | React.ReactPortal | Promise<React.AwaitedReactNode> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; make?: any; model?: any; year?: any; tires?: any; pressure?: any; suspension?: any; other?: any; }) => {
    // Create a string representation of the setup object
    // You can customize this based on your requirements
    // For example:
    return <div>
      <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{setup.make} {setup.model} ({setup.year})</h2>
      <h3 className=" text-sm text-neutral-800 dark:text-neutral-200">Tires: {setup.tires} @{setup.pressure}</h3>
      <h3 className=" text-sm text-neutral-800 dark:text-neutral-200">Suspension: {setup.suspension}</h3>
      <h3 className=" text-sm text-neutral-800 dark:text-neutral-200">Other Comments: {setup.other}</h3>
    </div>;
  }

  useEffect(() => {
    getSetups(enqueueSnackbar)
    .then((res) => {
      console.log(res.data)
      setSetups(res.data)
      return;
    }
    )
  }, [enqueueSnackbar])


  return (
    <>
      <Navbar className="top-2" />
      <div className="max-w-2xl w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">My Setups</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
        <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handleClick}
          >Create new setup</button>
      </div>
      <div className="max-w-4xl w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Other Setups</h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {setups && setups.map((setup: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, i: React.Key | null | undefined) => (
            <BentoGridItem
              key={i}
              title={setup.name}
              description={stringify(setup)}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </>
  )
}
