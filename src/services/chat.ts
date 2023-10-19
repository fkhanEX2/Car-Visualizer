import axios from "axios";
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

const getAction = async (reqObj: IGetActionRequest) => {
  const { query, role } = reqObj;
  const { data } = await axios.post<IGetActionResponse>(
    "http://172.17.1.229:8000/get_action",
    {
      messages: [{ content: query, role }],
    }
  );
  return data;
};

const getQuestionAnswer = async (reqObj: IGetQuestionAnswerRequest) => {
  const { query, role } = reqObj;
  const { data } = await axios.post<String>(
    "http://172.17.1.229:8000/ask_question",
    {
      messages: [{ content: query, role }],
    }
  );
  return data;
};

export const ChatService = { getChatReply, getAction, getQuestionAnswer };
