import apiClient from "./apiClient";

const getChatReply = async (reqBody: IGetChatRequest) => {
  //   const res = apiClient.post<IResponseWrapper<IGetChatResponse>>("", reqBody);
  //   return res;
  return {
    data: {
      selection: {
        category: "Category 3",
        categoryId: 4153,
        swatchId: 12221,
        swatchName: "Option 3",
      },
      query: "Can you change the color of the cabinet",
      answer: "Yeah Sure.",
      id: 1,
    } as IGetChatResponse,
  };
};

export const ChatService = { getChatReply };
