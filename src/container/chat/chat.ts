import { CHAT_HEADER, PUBSUB_CONSTANTS } from "../../utils/constants";
import CollapseIcon from "../../static/images/collapseArrow.png";
import ChatSendIcon from "../../static/images/sendChatIcon.png";
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
    visualizerContainer.insertAdjacentHTML("beforeend", renderChat(chats));
    attachChatCollapseEvent();
    attachChatSubmitEvent();
    pubsub.subscribe(PUBSUB_CONSTANTS.CHAT_QUERY_RESOLVED, (chat: IQuesAns) => {
      localStorage.setChat(chat);
      const chatList = $query(".chat-list");
      if (chatList) {
        chatList.insertAdjacentHTML("beforeend", renderQuery(chat));
      }
    });
  }
};

export const renderQuery = ({ answer, query, id }: IQuesAns) => {
  return `
  <li class="chat-list-item query-${id}">
    ${query}
  </li>
  <li class="chat-list-item answer-${id}">
    ${answer}
  </li>`;
};

export const renderChat = (chats: IQuesAns[]) => {
  return `
    <div class="chat-container">
        <div class="chat-header">
            <p class="chat-heading">${CHAT_HEADER}</p>
            <img class="chat-collapse-icon" src=${CollapseIcon}/>
        </div>
        <div class="chat-body hidden">
            <ul class="chat-list">
                ${chats.map((chat) => renderQuery(chat)).join("")}
            </ul>
            <div>
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="chat-submit" disabled>
                    <img src=${ChatSendIcon}/>
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
        chatSubmitButton.removeAttribute("disabled");
      } else {
        chatSubmitButton.setAttribute("disabled", "true");
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
      const { data } = await ChatService.getChatReply({
        query: chatInputElement.value.trim(),
        sceneId: localStorage.getCurrentSceneId(),
      });
      chatInputElement.value = "";
      chatSubmitButton.setAttribute("disabled", "true");
      pubsub.publish(PUBSUB_CONSTANTS.CHAT_QUERY_RESOLVED, {
        query: data.query,
        answer: data.answer,
        id: data.id,
      });
      if (data.selection) {
        const { category, categoryId, swatchId, swatchName } = data.selection;
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
          selectCurrentSwatch(
            categoryId,
            swatchesLi as NodeListOf<HTMLElement>
          );
        }
      }
    }
  } catch (err: any) {
    console.log(err);
  }
};
