import { useState } from "react";
import Flag from "react-world-flags";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectLanguage() {
  const [lang, setLang] = useState("en-us");

  const langOptions = [
    {
      value: "en-us",
      label: "English (US)",
      icon: <Flag code="USA" className="h-5" />
    },
    {
      value: "en-uk",
      label: "English (UK)",
      icon: <Flag code="GBR" className="h-5" />,
    },
    {
      value: "vi-vn",
      label: "Tiếng Việt",
      icon: <Flag code="VNM" className="h-5" />,
    }
  ]

  const handleChange = (value: string) => {
  setLang(value);
};

  return (
    <div>
      <Select value={lang} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {
              langOptions.map((option) => (
                <SelectItem value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </div>
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
