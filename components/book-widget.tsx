import Image from "next/image";
import { Badge } from "./ui/badge";
import { Check, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface BookWidgetProps {
  image: string;
  name: string;
  author: string;
}

const BookWidget = ({ image, name, author }: BookWidgetProps) => {
  return (
    <div className="flex p-2 bg-white rounded-lg shadow-md w-min">
      <div className="w-48">
        <Image src={image} alt="book" height={100} width={200} />
      </div>
      <div className="p-2 justify-between flex flex-col">
        <div>
          <p className="whitespace-nowrap text-2xl">{name}</p>
          <Button
            variant="link"
            className="whitespace-nowrap text-xl font-light p-0 h-min m-0"
          >
            {author}
          </Button>
          <div>
            <Badge className="font-light">Biography</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-900 text-white space-x-2">
            <Check strokeWidth={1} className="w-4 h-4" />{" "}
            <span className="font-light">Readed</span>
          </Badge>
          <Badge className="bg-rose-900 text-white space-x-2">
            <Heart strokeWidth={1} className="w-4 h-4" />{" "}
            <span className="font-light">432</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default BookWidget;
