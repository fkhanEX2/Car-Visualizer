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
