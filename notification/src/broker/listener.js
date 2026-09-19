import { subscribeToQueue } from "./rabbit.js";

import sendEmail from "../utils/email.js";

import welcomeTemplate from "../templates/welcome.template.js";
export async function startListener() {
  await subscribeToQueue(
    "user_created",

    async (data) => {
      const html = welcomeTemplate(data.fullname, data.role);

      await sendEmail(
        data.email,

        "Welcome to Spotify",

        html,
      );
    },
  );
}
