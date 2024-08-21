"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import faqs from "./faqs";
import { createClient } from "@/utils/supabase/client";

export default function Component() {
  const supabase = createClient();
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetchFAQs = async () => {
      const { data, error } = await supabase.from("faq").select("*");
      if (error) {
        console.error("Error fetching FAQs:", error);
      } else {
        setFaqs(data);
        console.log("Fetched FAQs:", data);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <section className="mx-auto w-full md:px-10 md:py-10 px-5 py-5 ">
      <div className="mx-auto flex w-full flex-col items-center gap-8">
        <Accordion
          fullWidth
          keepContentMounted
          itemClasses={{
            base: "px-0 md:px-2 md:px-6",
            title: "font-medium",
            trigger: "py-6 flex-row-reverse",
            content: "pt-0 pb-6 text-base text-default-500",
            indicator: "rotate-0 data-[open=true]:-rotate-45",
          }}
          items={faqs}
          selectionMode="multiple"
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              indicator={
                <Icon
                  className="text-gray-500"
                  icon="lucide:plus"
                  width={24}
                />
              }
              title={item.question}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
