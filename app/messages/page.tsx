import { redirect } from "next/navigation";
import { defaultInvitationSlug } from "../invitations";

export default function MessagesRedirect() {
  redirect(`/${defaultInvitationSlug}/messages`);
}
