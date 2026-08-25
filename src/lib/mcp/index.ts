import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import updateMyProfile from "./tools/update-my-profile";
import searchAlumni from "./tools/search-alumni";
import listEvents from "./tools/list-events";
import listAnnouncements from "./tools/list-announcements";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "qbh-alumni-mcp",
  title: "QBH UMBRELLA Alumni Portal",
  version: "0.1.0",
  instructions:
    "Tools for the QBH UMBRELLA school alumni network. Look up your own alumni profile, update it, search the alumni directory, and browse events and announcements. All tools act as the signed-in alumnus and respect row-level security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, updateMyProfile, searchAlumni, listEvents, listAnnouncements],
});
