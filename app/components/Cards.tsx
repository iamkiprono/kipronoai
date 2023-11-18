"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Cards = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = [
    {
      id: "1",
      subtitle: "Hello",
      title: "This is it",
    },
    {
      id: "2",
      subtitle: "Hello",
      title: "This 2",
    },
  ];
  return (
    <div>
        <div className="flex gap-2 flex-wrap">

      {items.map((item) => (
        <motion.div
          className="bg-white p-4 m-4"
          key={item.id}
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}
      </div>

      <AnimatePresence>
        {selectedId &&
          items
            .filter((i) => i.id === selectedId)
            .map((item) => {
              return (
                <motion.div key={item.id} layoutId={selectedId}>
                  <motion.h5>{item.subtitle}</motion.h5>
                  <motion.h2>{item.title}</motion.h2>
                  <motion.button className="border bg-black" onClick={() => setSelectedId(null)} />
                </motion.div>
              );
            })}
      </AnimatePresence>
    </div>
  );
};

export default Cards;
