import { nanoid } from "nanoid";
import { APIRequest } from "../modules/fetch/APIRequest";

export const createMessage = (content: string, context: any, nonce) => {
  return new Promise(res => {

    let { currentChannel } = context;

    APIRequest(
      `/channels/${currentChannel.id}/messages`,
      {
        method: "POST",
        body: {
          content,
          nonce,
        },
      }
    ).then(x => res(x))
  })
};
