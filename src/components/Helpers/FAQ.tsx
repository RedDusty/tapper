import { useTypedSelector } from "../../redux/useTypedSelector";
import FAQBattlefieldTab from "./FAQTabs/FAQBattlefieldTab";
import FAQLobbyTab from "./FAQTabs/FAQLobbyTab";
import FAQOtherTab from "./FAQTabs/FAQOtherTab";
import FAQSkinTab from "./FAQTabs/FAQSkinTab";

const FAQ = () => {
  const user = useTypedSelector((state) => state.user);
  const lobby = useTypedSelector((state) => state.lobby);
  return (
    <div
      className="flex flex-col items-center overflow-auto panelWidth mx-auto"
      style={{ height: window.innerHeight - 48 }}
    >
      <h1 className="text-6xl text-sky-500">Tapper - FAQ</h1>
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        Skin
      </h2>
      <FAQSkinTab {...user} />
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        Other
      </h2>
      <FAQOtherTab {...lobby} />
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        Lobby
      </h2>
      <FAQLobbyTab {...lobby} />
      <h2 className="text-sky-700 text-4xl mt-8 text-center cursor-pointer hover:text-sky-500 focus:text-sky-300">
        Battlefield
      </h2>
      <FAQBattlefieldTab {...user} />
    </div>
  );
};

export default FAQ;
