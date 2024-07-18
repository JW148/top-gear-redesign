import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { PiMinusCircleFill } from "react-icons/pi";

export function SortableItem({ id, handleRemoveImage }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Button
        isIconOnly
        className="absolute -top-2 -right-2 bg-transparent p-0 m-0 "
        aria-label="Delete listing button"
        onPress={() => handleRemoveImage(id)}
      >
        <PiMinusCircleFill className="size-6 text-danger-600" />
      </Button>
      <Image
        key={id}
        alt="Card background"
        className="m-2 object-cover max-h-[70px]"
        src={`/api/image-endpoint/${id}`}
        width={100}
        height={100}
      />
    </div>
  );
}
