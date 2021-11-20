import { useTranslation } from 'react-i18next';
import { useTypedSelector } from "../redux/useTypedSelector";
import FAQBattlefieldTab from "./FAQTabs/FAQBattlefieldTab";
import FAQLobbyTab from "./FAQTabs/FAQLobbyTab";
import FAQOtherTab from "./FAQTabs/FAQOtherTab";

const FAQ = () => {
  const user = useTypedSelector((state) => state.user);
  const lobby = useTypedSelector((state) => state.lobby);
  const { t } = useTranslation()
  return (
    <div
      className="flex flex-col items-center overflow-auto panelWidth mx-auto px-2"
      style={{ height: window.innerHeight - 48 }}
    >
      <h1 className="text-6xl text-sky-500">Tapper - {t("FAQ")}</h1>
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        {t("OTHER")}
      </h2>
      <FAQOtherTab {...lobby} />
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        {t("LOBBY")}
      </h2>
      <FAQLobbyTab {...lobby} />
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        {t("BATTLEFIELD")}
      </h2>
      <FAQBattlefieldTab {...user} />
    </div>
  );
};

export default FAQ;
