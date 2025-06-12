import { Context } from "hono";

export const getTranslation = (
  c: Context<{ Variables: { locale: string; messages: Record<string, string> } }>, 
  key: string
): string => {
  const messages = c.get('messages');
  return messages?.[key] || key;
};