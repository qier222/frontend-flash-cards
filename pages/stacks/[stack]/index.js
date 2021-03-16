import { useState, useEffect } from "react";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import stacksConfig from "../../../stacks.config";
import Link from "next/link";
import marked from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

export default function Stack() {
  const router = useRouter();
  const [isBlur, setIsBlur] = useState(true);
  const [stack, setStack] = useState({ cards: [] });
  const [card, setCard] = useState({});

  useEffect(() => {
    if (!router.query.stack) return;
    const stack = stacksConfig.stacks.find((s) => s.id === router.query.stack);
    if (stack) {
      setStack(stack);
      const cardId = localStorage.getItem(stack.id) || "1";
      const newCard = stack.cards.find((c) => String(c.id) === cardId);
      setCard(newCard);
    } else {
      router.push("/404");
    }
  }, [router.query.stack]);

  useEffect(() => {
    Prism.highlightAll();
  }, [card]);

  const handleSetCard = (card) => {
    setIsBlur(true);
    setCard(card);
    localStorage.setItem(stack.id, card.id);
  };

  const handleClickCard = () => {
    if (window.getSelection().toString().length === 0) {
      setIsBlur(!isBlur);
    }
  };

  const nextCard = () => {
    const currentCardIndex = stack.cards.findIndex((c) => c.id === card.id);
    if (currentCardIndex === stack.cards.length - 1) {
      alert("已经是最后一张卡啦");
      return;
    }
    handleSetCard(stack.cards[currentCardIndex + 1]);
  };

  const lastCard = () => {
    const currentCardIndex = stack.cards.findIndex((c) => c.id === card.id);
    if (currentCardIndex === 0) return;
    handleSetCard(stack.cards[currentCardIndex - 1]);
  };

  return (
    <div className="w-full p-3 m-auto mt-2 md:mt-16 md:w-2/4">
      <Head>
        <title>{stack.name} - 前端抽认卡</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <button className="px-2 py-1 text-2xl font-semibold text-gray-700 rounded-lg hover:bg-gray-200">
            &larr;
          </button>
        </Link>
        <div className="px-3 py-1 text-lg font-semibold text-gray-900">
          {stack.name}
        </div>
        <div
          className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full cursor-default"
          title="已阅 / 总共"
        >
          {card.id} / {stack.cards[stack.cards?.length - 1]?.id}
        </div>
      </div>
      <div
        className="w-full transition-all duration-200 shadow-sm cursor-pointer ring-1 ring-opacity-5 ring-black hover:shadow group rounded-xl"
        onClick={() => handleClickCard()}
      >
        <div className="p-7">
          <div className="text-2xl">
            {card.isQuestion && (
              <span className="mr-2 font-semibold text-primary">问:</span>
            )}
            {card.title}
          </div>
        </div>
        <hr />
        <div
          className={clsx(
            "pb-3 px-7 pt-7 text-lg markdown",
            isBlur && "text-blur"
          )}
          dangerouslySetInnerHTML={{
            __html: marked(card.description || ""),
          }}
        ></div>
      </div>
      <div className="flex w-full my-8 select-none">
        <button
          className="flex-grow px-8 py-3 font-medium transition-all duration-200 bg-white rounded-lg shadow-sm ring-1 ring-opacity-5 ring-black hover:shadow"
          onClick={() => lastCard()}
        >
          上一个
        </button>
        <button
          className="flex-grow px-8 py-3 ml-5 font-medium transition-all duration-200 bg-white rounded-lg shadow-sm ring-1 ring-opacity-5 ring-black hover:shadow"
          onClick={() => nextCard()}
        >
          下一个
        </button>
      </div>
    </div>
  );
}
