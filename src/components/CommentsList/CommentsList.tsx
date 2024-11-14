import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMessagesRequest } from "../../store/actions/messagesActions";
import Comment from "../Comment/Comment";
import styles from "./CommentsList.module.scss";

export default function CommentsList() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(
    (state: any) => state.messages
  );
  const [isSortingByNew, setIsSortingByNew] = useState(false);

  const sortedMessages = isSortingByNew
    ? [...messages].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [...messages].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

  useEffect(() => {
    dispatch(loadMessagesRequest());
  }, [dispatch]);

  const favourites = localStorage.getItem("favourites")
    ? JSON.parse(localStorage.getItem("favourites") as string)
    : [];

  const addTofavourites = (id: string) => {
    // Так как с бэкенда сообщения с одинаковым id приходят рандомные,
    // то корректная работа данного функционала возможноа исключительно со стартовым набором
    // сообщений (никакие данные более не являются уникальными, кроме id)
    const index = favourites.indexOf(id);

    if (!favourites.includes(id)) {
      favourites.push(id);
    } else {
      favourites.splice(index, 1);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  const changeSort = () => {
    setIsSortingByNew(!isSortingByNew);
  };

  const loadNewMessages = () => {
    dispatch(loadMessagesRequest(messages[messages.length - 1].id.toString()));
  };

  const loadOldMessages = () => {
    dispatch(loadMessagesRequest(messages[0].id.toString(), true));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <div className={styles.switchWrapper}>
        <span>Сначала старые</span>
        <input
          onClick={changeSort}
          className={styles.switch}
          type="checkbox"
          id="switch"
        />
        <label className={styles.switchLabel} htmlFor="switch">
          Toggle
        </label>
        <span>Сначала новые</span>
      </div>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={changeSort}
      ></button>
      <div>
        <button className={styles.loadButton} onClick={loadOldMessages}>
          Загрузить {isSortingByNew ? "следующие" : "предыдущие"}
        </button>
      </div>
      {sortedMessages.map((message: any, index: number) => (
        <Comment
          key={index}
          author={message?.author}
          channel={message?.channel}
          date={message?.date}
          content={message?.content}
          attachments={message?.attachments}
          id={message?.id}
          addTofavourites={addTofavourites}
        />
      ))}
      <button className={styles.loadButton} onClick={loadNewMessages}>
        Загрузить {!isSortingByNew ? "следующие" : "предыдущие"}
      </button>
    </div>
  );
}
