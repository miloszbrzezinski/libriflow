import { Separator } from "./ui/separator";

const QuotesList = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-light">Today&apos;s quotes</p>
      <Separator className="bg-slate-800 shadow-md" />
    </div>
  );
};

export default QuotesList;
