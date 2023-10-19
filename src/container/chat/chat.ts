import {
  AVAILABLE_COLORS,
  CHAT_HEADER,
  INTENTS,
  PUBSUB_CONSTANTS,
} from "../../utils/constants";
import ChatSendIcon from "../../static/images/ChatSendIcon.png";
import user from "../../static/images/user.png";
import downArrow from "../../static/images/downArrow.png";
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
      const chatList = $query(".chat-list");
      if (chatList) {
        chatList.insertAdjacentHTML("beforeend", renderQuery(chat));
      }
    });
  }
};

export const renderQuery = ({ answer, query, id }: IQuesAns) => {
  return `
   <div class="chat-list-item query-${id}">
  <img src=${user}/>
    <p>${query}</p>
  </div>
  <div class="chat-list-item answer-${id}">
   <img src=${user}/>
    <p>${answer}</p>
  </div>`;
};

export const renderChat = (chats: IQuesAns[]) => {
  return `
    <div class="chat-container">
        <div class="chat-header">
            <p class="chat-heading">${CHAT_HEADER}</p>
            <img class="chat-collapse-icon rotate" src=${downArrow}/>
        </div>
        <div class="chat-body hidden">
            <div class="chat-list-container">
              <ul class="chat-list">
                  ${chats.map((chat) => renderQuery(chat)).join("")}
              </ul>
            </div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="chat-submit disable" disabled>
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
        chatSubmitButton.classList.remove("disable");
      } else {
        chatSubmitButton.setAttribute("disabled", "true");
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
      chatSubmitButton.setAttribute("disabled", "true");
      chatSubmitButton.classList.add("disable");
      const { response } = await ChatService.getAction({
        query: chatInputElement.value.trim(),
        sceneId: localStorage.getCurrentSceneId(),
        role: "user",
      });
      let chatQues = chatInputElement.value.trim();
      let chatAns = colorCheck(response.value.toString())
        ? "Yeah sure!"
        : "Currently Unavailable";
      if (response.intent === INTENTS.CAR_INFO_QUERY) {
        const res = await ChatService.getQuestionAnswer({
          query: chatInputElement.value.trim(),
          sceneId: localStorage.getCurrentSceneId(),
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
        const { category, categoryId, swatchId, swatchName } =
          getSelectionUponChat({ response });

        if (category && categoryId && swatchId && swatchName) {
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
            Number(activeCtaegory.getAttribute("data-category-id")) ===
              categoryId
          ) {
            selectCurrentSwatch(
              categoryId,
              swatchesLi as NodeListOf<HTMLElement>
            );
          }
        }
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
