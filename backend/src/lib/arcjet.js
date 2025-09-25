import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_API,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    slidingWindow({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      max: 100,
      interval: 60,
    })
  ],
});

export default aj;
