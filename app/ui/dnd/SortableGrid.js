"use client";

import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { SortableItem } from "./SortableItem";

export default function SortableGrid({ items, setItems }) {
  const [activeID, setActiveID] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    setActiveID(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveID(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveID(null);
  }, []);

  const handleRemoveImage = (file) => {
    setItems((oldArr) => oldArr.filter((item) => item !== file));
  };

  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="flex flex-row overflow-hidden justify-center flex-wrap mt-4">
            {items.map((id, i) => (
              <SortableItem
                key={i}
                id={id}
                handleRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
