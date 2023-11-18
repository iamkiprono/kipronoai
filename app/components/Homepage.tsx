"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import { getAIRes } from "../utils/openai";

type chat = {
  role: string;
  message: string;
  date: string;
  user?: string
};

const Homepage = () => {
  const [pointToStart, setPointToStart] = useState(0);

  const { isSignedIn, user, isLoaded } = useUser();


  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<chat[]>([
    {
      role: "assistant",
      message: "How can I help you today?",
      date: new Date().toLocaleString(),
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const apiCall = async (prompt: string) => {
    try {
      setLoading(true);
      // const response = await fetch("http://localhost:5000/ai", {
      //   cache: "no-cache",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ prompt }),
      // });
  
      // const res = await response.json();
      const res = await getAIRes(prompt);
      // @ts-ignore
      setChat((prevChat) => [
        ...prevChat,
        { role: res.role, message: res.res, date: res.date },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error instanceof Error)
      alert(error.message)
      
    }
  
  };

  const increseLength = () => {
    if (pointToStart !== chat[chat.length - 1].message.length) {
      setPointToStart((prevPoint) => prevPoint + 1);
    }
  };

  if (pointToStart < chat[chat.length - 1].message.length) {
    setTimeout(() => {
      increseLength();
    }, 50);
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chat, pointToStart]);
  return (
    <div className="bg-[#2b2828] min-h-[100vh]">
      <div className="p-6 max-w-7xl m-auto flex flex-col items-center ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apiCall(prompt);
            setPointToStart(0);
            setChat((prevChat) => [
              ...prevChat,
              {
                role: "user",
                message: prompt,
                date: new Date().toLocaleString(),
              },
            ]);
            setPrompt("");
          }}
          className="p-2 bg-[#2b2828] min-h-[85vh] w-full rounded relative flex flex-col items-center"
          action=""
        >
          <div
            ref={scrollContainerRef}
            className="mt-4 rounded w-full  p-2 overflow-y-scroll h-[70vh] no-scrollbar"
          >
            {chat.map((c, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  key={i}
                  className={`${
                    c.role === "user"
                      ? "bg-[#ffe6e6] text-[#343434]"
                      : "bg-[#bcb5b5] text-[#000000]"
                  } p-4 my-4 rounded `}
                >
                  <p className="text-sm border w-fit p-1 border-black rounded">
                    {c.date}
                  </p>
                  <p className="">
                    {c.role === "user"
                      ? c.message
                      : chat.length - 1 === i
                      ? c.message?.slice(0, pointToStart)
                      : c.message}
                  </p>
                </motion.div>
              );
            })}
            {loading && (
              <Image width={25} height={25} src="/loading.svg" alt="Loading" />
            )}
          </div>
          <div className="w-full absolute bottom-4 flex justify-between p-2 gap-2 bg-slate-800">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border p-2 rounded focus:outline-none w-full"
              placeholder="Ask me anything..."
              type="text"
            />
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              disabled={loading || !prompt}
              className="p-2 border bg-[#ac6262] text-white  rounded"
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
