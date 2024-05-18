export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 p-4 text-sm sm:p-8 sm:text-base">
        <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight dark:text-black sm:text-3xl">
          Career Compass AI Svetovalec
        </h1>
        <p className="leading-normal text-zinc-900">
          AI svetovalec vam bo pomagal pri kariernih vprašanjih. Začnite z
          vprašanjem ali izberite eno od možnosti spodaj.
        </p>
      </div>
    </div>
  );
}
