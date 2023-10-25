import { CHAT_HEADER, PUBSUB_CONSTANTS } from "../../utils/constants";
import SendIcon from "../../static/icons/SendIcon.png";
import ChatIcon from "../../static/icons/ChatIcon.png";
import ProfileIcon from "../../static/icons/ProfileIcon.png";
import FrameIcon from "../../static/icons/FrameIcon.png";
import UserIcon from "../../static/icons/UserIcon.png";
import CollapseIcon from "../../static/icons/CollapseIcon.png";
import { $id, $query } from "../../utils/dom";
import "./chat.css";
import { Entity } from "aframe";
import { ChatService } from "../../services/chat";
import localStorage from "../../shared/localStorage";
import pubsub from "../../shared/pubsub";
import cacheStorage from "../../shared/cacheStorage";
import { attachChatIntentEvents } from "../chat-intent/chatIntent";

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
      <img src=${ProfileIcon}/>
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
      <div class="chat-body">
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
  const chatWindow = $query(".chat-container");
  if (toggleButton && chatWindow) {
    toggleButton.addEventListener("click", () => {
      toggleButton.classList.toggle("rotate");
      chatWindow.classList.toggle("chat-open");
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
      await attachChatIntentEvents(chatInputElement.value.trim(), response);
    }
  } catch (err: any) {
    console.log(err);
  }
};
