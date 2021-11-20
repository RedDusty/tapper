import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./purgeCSS.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Loading from './components/Helpers/Loading';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ru"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/lang/{{lng}}.json",
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoryRouter>
        <Suspense
          fallback={
            <div className="fixed w-screen h-screen flex items-center justify-center bg-black bg-opacity-25">
              <div className="flex items-center justify-center p-12 bg-gray-300 bg-opacity-50 rounded-full">
                <Loading color="text-gray-600" />
              </div>
            </div>
          }
        >
          <App />
        </Suspense>
      </MemoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
