import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import stacksConfig from "../stacks.config";

export default function Home() {
  const stacks = stacksConfig.stacks;
  const cardsComponents = stacks.map((stackOne) => {
    const [readCount, setReadCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [stack] = useState(stackOne);

    useEffect(() => {
      if (!stack.cards) return;
      const currentCardId = localStorage.getItem(stack.id);
      const currentCardIndex =
        stack.cards.findIndex((c) => String(c.id) === currentCardId) || "1";
      setReadCount(stack.cards?.slice(0, currentCardIndex).length || 0);
      setProgress(~~((readCount / (stack.cards.length || 1)) * 100));
    }, []);

    return (
      <Link href={`/stacks/${stack.id}`} key={stack.name}>
        <div className="text-left no-underline transition-all duration-200 bg-white shadow-sm cursor-pointer p-7 ring-1 ring-opacity-5 ring-black hover:shadow group rounded-xl min-w-1/2">
          <h3 className="mb-4 text-2xl font-medium transition-all duration-200 md:text-3xl group-hover:text-primary">
            {stack.name}{" "}
            <span className="inline-block transition-all group-hover:animate-bounce-horizontal">
              &rarr;
            </span>
          </h3>
          <p className="text-gray-500 transition-all duration-200 group-hover:text-gray-900">
            {stack.cards?.length || 0}张卡片 · {readCount}张已阅读 · 进度
            {progress}%
          </p>
        </div>
      </Link>
    );
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 bg-gray-50">
      <Head>
        <title>前端抽认卡</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-0 py-20">
        <h1 className="mb-8 text-5xl font-semibold text-center md:text-7xl">
          <a
            href="https://github.com/qier222/fronent-flash-cards"
            target="_blank"
            className="text-primary hover:underline"
          >
            前端
          </a>
          知识抽认卡
        </h1>

        <p className="text-xl text-center md:text-2xl">
          repeat("read, memorize, swipe", ∞)
        </p>

        <div className="grid max-w-screen-md grid-cols-1 gap-8 mt-16 md:mt-12 md:grid-cols-2">
          {cardsComponents}
          <Link href="https://github.com/qier222/frontend-flash-cards">
            <div className="text-left no-underline transition-all duration-200 bg-white shadow-sm cursor-pointer p-7 ring-1 ring-opacity-5 ring-black hover:shadow group rounded-xl min-w-1/2">
              <h3 className="mb-4 text-2xl font-medium transition-all duration-200 md:text-3xl group-hover:text-primary">
                GitHub Repo
                <span className="inline-block transition-all group-hover:animate-bounce-horizontal">
                  &rarr;
                </span>
              </h3>
              <p className="text-gray-500 transition-all duration-200 group-hover:text-gray-900">
                欢迎提issue或PR
              </p>
            </div>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-20 border-t border-gray-300">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
