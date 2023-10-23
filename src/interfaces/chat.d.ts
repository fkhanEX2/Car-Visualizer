interface IGetChatResponse extends IQuesAns {
  selection?: IStorageSelection;
}

interface IQuesAns {
  id: number;
  query: string;
  answer: string;
}

interface IGetChatRequest {
  sceneId: number;
  query: string;
}

interface IGetActionRequest {
  sceneId: number;
  query: string;
  role: string;
}

interface IGetActionIntent {
  intent: string;
  value: string | boolean;
}

interface IGetActionResponse {
  response: IGetActionIntent;
}

interface IGetQuestionAnswerRequest {
  sceneId: number;
  query: string;
  role: string;
}
