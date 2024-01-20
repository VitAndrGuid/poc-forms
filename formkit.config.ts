import { fr } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";

export default defineFormKitConfig({
  locale: "fr",
  locales: { fr },
  config: { rootClasses },
});
