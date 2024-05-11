import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface TruncateTextProps {
  text: string;
  maxLength?: number;
  toggleOpenView?: () => void;
}

const TruncateText: React.FC<TruncateTextProps> = ({
  text,
  maxLength = 20,
  toggleOpenView,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (toggleOpenView) {
      toggleOpenView();
      return;
    }
    setIsExpanded((prevState) => !prevState);
  };

  const toggleLabel = isExpanded ? t("showLess") : t("showMore");

  const truncatedText = isExpanded
    ? text
    : text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;

  return (
    <div>
      {truncatedText}
      {text.length > maxLength && (
        <span
          onClick={toggleExpand}
          className="cursor-pointer text-sm italic text-[#6B0E01]"
        >
          {" "}
          {toggleLabel}{" "}
        </span>
      )}
    </div>
  );
};

export default TruncateText;
