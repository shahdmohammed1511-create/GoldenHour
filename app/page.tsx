import { redirect } from "next/navigation";
import { defaultInvitationSlug } from "./invitations";

export default function Page() {
  redirect(`/${defaultInvitationSlug}`);
}