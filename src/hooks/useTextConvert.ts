import { useTranslation } from "react-i18next";

const useTextTranslation = () => {
  const { t } = useTranslation();

  const textRequired = (value: string) => {
    return t("isRequired", { value: `${t(`${value}`)}` });
  };

  const mustBeGreater = (value: string, greater: string | number) => {
    return t("mustBeGreater", { value: `${t(`${value}`)}`, greater });
  };

  const mustBeSmaller = (value: string, smaller: string | number) => {
    return t("mustBeSmaller", {
      value: `${t(`${value}`)}`,
      smaller,
    });
  };

  return {
    textRequired,
    mustBeGreater,
    mustBeSmaller,
  };
};

export default useTextTranslation;
