import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nContext";
import router from "./router";
import Preloader from "./components/Preloader";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let cancelled = false;
    const minDelayMs = 900;

    const finish = () => {
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, minDelayMs);
    };

    if (document.readyState === "complete") {
      finish();
      return () => {
        cancelled = true;
      };
    }

    window.addEventListener("load", finish, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <I18nProvider>
      {ready ? <RouterProvider router={router} /> : <Preloader />}
    </I18nProvider>
  );
}

export default App;
