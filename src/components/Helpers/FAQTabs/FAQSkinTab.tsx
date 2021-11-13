import { Link } from "react-router-dom";

const FAQSkinTab = () => {
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">Customize your skin as you like!</p>
        <p className="mt-2">
          If you do not like this, then you can{" "}
          <Link to="/skins" className="text-green-700 underline">
            turn on
          </Link>{" "}
          the option in which all your squares will be <span className="text-gray-400">light gray</span>, and your enemies
          will be <span className="text-black">black</span>.
        </p>
      </div>
    </div>
  );
};

export default FAQSkinTab;
