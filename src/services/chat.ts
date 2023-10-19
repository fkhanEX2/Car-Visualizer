import apiClient from "./apiClient";

const getChatReply = async (reqBody: IGetChatRequest) => {
  //   const res = await apiClient.post<IResponseWrapper<IGetChatResponse>>("", reqBody);
  //   return res;
  return {
    data: {
      selection: {
        category: "Color",
        categoryId: 3801,
        swatchId: 2802,
        swatchName: "Color 2",
      },
      query: "Can you change the color of car to blue",
      answer: "Yeah Sure!",
      id: 1,
    } as IGetChatResponse,
  };
};

export const ChatService = { getChatReply };
