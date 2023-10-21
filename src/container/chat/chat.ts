import {
  AVAILABLE_COLORS,
  CHAT_HEADER,
  INTENTS,
  PUBSUB_CONSTANTS,
} from "../../utils/constants";
import SendIcon from "../../static/images/sendIcon.png";
import ChatIcon from "../../static/images/chatIcon.png";
import FrameIcon from "../../static/images/frameIcon.png";
import UserIcon from "../../static/images/user.png";
import CollapseIcon from "../../static/images/downArrow.png";
import { $id, $query, $queryAll } from "../../utils/dom";
import "./chat.css";
import { Entity } from "aframe";
import { ChatService } from "../../services/chat";
import localStorage from "../../shared/localStorage";
import pubsub from "../../shared/pubsub";
import { selectCurrentSwatch } from "../swatch/swatch";
import cacheStorage from "../../shared/cacheStorage";

export const loadChat = (container: string) => {
  const visualizerContainer = $id(container);
  const { chats } = cacheStorage.storage;
  if (visualizerContainer) {
    visualizerContainer.insertAdjacentHTML("afterbegin", renderChat(chats));
    attachChatCollapseEvent();
    attachChatSubmitEvent();
    pubsub.subscribe(PUBSUB_CONSTANTS.CHAT_QUERY_RESOLVED, (chat: IQuesAns) => {
      localStorage.setChat(chat);
      const chatListContainer = $query(".chat-list-container");
      const chatList = $query(".chat-list");
      if (chatList && chatListContainer) {
        chatList.insertAdjacentHTML("beforeend", renderQuery(chat));
        (chatListContainer as Element).scrollTop = (
          chatListContainer as Element
        ).scrollHeight;
      }
    });
  }
};

export const renderQuery = ({ answer, query, id }: IQuesAns) => {
  return `
    <div class="chat-list-item query-${id}">
      <img src=${UserIcon}/>
      <p>${query}</p>
    </div>
    <div class="chat-list-item answer-${id}">
      <img src=${UserIcon}/>
      <p>${answer}</p>
    </div>
  `;
};

export const renderChat = (chats: IQuesAns[]) => {
  return `
    <div class="chat-container">
      <div class="chat-header">
        <img class="chat-icon" src=${ChatIcon}/>
        <div class="chat-heading">
          <h3>${CHAT_HEADER}</h3>
          <p>Voice-Enabled Car Configuration</p>
        </div>
        <img class="chat-collapse-icon rotate" src=${CollapseIcon}/>
      </div>
      <div class="chat-body hidden">
        <div class="chat-list-container">
          <ul class="chat-list">
            ${chats.map((chat) => renderQuery(chat)).join("")}
          </ul>
        </div>
        <div class="chat-input-container">
          <input type="text" class="chat-input" placeholder="Type your message...">
          <img class="voice-input" title="This feature is currently unavailable" src=${FrameIcon}/>
          <button class="chat-submit disable">
            <img src=${SendIcon}/>  
          </button>
        </div>
      </div>
    </div>
  `;
};

export const attachChatCollapseEvent = () => {
  const toggleButton = $query(`.chat-collapse-icon`);
  const chatWindow = $query(".chat-body");
  if (toggleButton && chatWindow) {
    toggleButton.addEventListener("click", () => {
      toggleButton.classList.toggle("rotate");
      chatWindow.classList.toggle("hidden");
    });
  }
};

export const attachChatSubmitEvent = () => {
  const chatInputField = $query(`.chat-input`);
  const chatSubmitButton = $query(`.chat-submit`);

  if (chatInputField && chatSubmitButton) {
    chatInputField.addEventListener("input", () => {
      if ((chatInputField as HTMLInputElement).value.trim() !== "") {
        chatSubmitButton.classList.remove("disable");
      } else {
        chatSubmitButton.classList.add("disable");
      }
    });

    chatSubmitButton.addEventListener("click", async () => {
      await chatSubmitHandler(
        chatInputField as HTMLInputElement,
        chatSubmitButton
      );
    });
  }
};

export const chatSubmitHandler = async (
  chatInputElement: HTMLInputElement,
  chatSubmitButton: Element | Entity<any>
) => {
  try {
    if (chatInputElement.value.trim()) {
      const sceneId = localStorage.getCurrentSceneId();
      chatSubmitButton.classList.add("disable");
      const { response } = await ChatService.getAction({
        query: chatInputElement.value.trim(),
        sceneId,
        role: "user",
      });
      let chatQues = chatInputElement.value.trim();
      let chatAns = colorCheck(response.value.toString())
        ? "Yeah sure!"
        : "Currently Unavailable";
      if (response.intent === INTENTS.CAR_INFO_QUERY) {
        const res = await ChatService.getQuestionAnswer({
          query: chatInputElement.value.trim(),
          sceneId,
          role: "user",
        });
        chatAns = res.toString();
      }
      chatInputElement.value = "";
      pubsub.publish(PUBSUB_CONSTANTS.CHAT_QUERY_RESOLVED, {
        query: chatQues,
        answer: chatAns,
        id: 1,
      });
      if (response.intent !== INTENTS.CAR_INFO_QUERY) {
        updateSceneSelections({ response });
      }
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const getSelectionUponChat = ({
  response,
}: IGetActionResponse): IStorageSelection => {
  const currentSceneId = localStorage.getCurrentSceneId();
  const { value, intent } = response;
  const { categories } = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.id === currentSceneId
  )!;
  const data = categories[0].swatches.find(
    (swatch) => swatch.name.toLowerCase() === value.toLowerCase()
  );
  if (data) {
    return {
      category: categories[0].name,
      categoryId: categories[0].id,
      swatchId: data.id,
      swatchName: data.name,
    };
  }
  return {} as IStorageSelection;
};

export const colorCheck = (color: string) => {
  return AVAILABLE_COLORS.includes(color.toLowerCase());
};

export const updateSceneSelections = ({ response }: IGetActionResponse) => {
  const { category, categoryId, swatchId, swatchName } = getSelectionUponChat({
    response,
  });
  if (swatchId) {
    pubsub.publish(PUBSUB_CONSTANTS.SWATCH_SELECT_EVENT, {
      categoryId,
      categoryName: category,
      swatchId,
      swatchName,
    } as ISwatchDetail);
    const swatchesLi = $queryAll("ul.swatch-category-list li");
    const activeCtaegory = $query(`.category-container-list-item.active`);
    if (
      activeCtaegory &&
      Number(activeCtaegory.getAttribute("data-category-id")) === categoryId
    ) {
      selectCurrentSwatch(categoryId, swatchesLi as NodeListOf<HTMLElement>);
    }
  }
};
