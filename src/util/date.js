import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

// 한국어로 "몇 시간 전" 시간 표시
register("ko", koLocale);

export function formatAgo(date, lang = "en_US") {
  return format(date, lang);
}
