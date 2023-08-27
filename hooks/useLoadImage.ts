import { Song } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useLoadImage(song: Song) {
  const supabaseClient = useSupabaseClient();

  if (!song) return null;

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
}
