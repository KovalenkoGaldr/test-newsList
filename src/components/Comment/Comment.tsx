import { ArrowRight, FileText, Settings, Star } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Comment.module.scss";

interface IAttachments {
  type: string;
  url: string;
}

interface PostProps {
  author: string;
  channel: string;
  content: string;
  date: string;
  attachments: IAttachments[];
  id: string;
  addTofavourites: (id: string) => void;
}

export default function Component(props: Partial<PostProps> = {}) {
  const {
    author,
    channel,
    content,
    date,
    attachments,
    id = "",
    addTofavourites,
  } = props;

  const [isFavorites, setIsFavorites] = useState<boolean>(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    return favourites.includes(id);
  });

  const filteredDay = date ? new Date(date).toLocaleDateString() : "";
  const filteredTime = date
    ? new Date(date).toLocaleTimeString().substring(0, 5)
    : "";

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (isFavorites && !favourites.includes(id)) {
      favourites.push(id);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } else if (!isFavorites && favourites.includes(id)) {
      const index = favourites.indexOf(id);
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [isFavorites, id]);

  return (
    <div className={styles.component}>
      <div className={styles.componentHeader}>
        <div className={styles.author}>
          <div className={styles.authorAvatar}>{author?.[0]}</div>
          <div className={styles.timestamp}>
            {filteredDay} <br /> {filteredTime}
          </div>
        </div>

        <div className={styles.contentInfo}>
          <div>
            <h2 className={styles.authorName}>{author}</h2>
            <span className={styles.authorDescription}>{channel}</span>
          </div>
          <div className={styles.content}>
            <div className={styles.comment}>{content}</div>
            <div className={styles.more}>Далее</div>
            {attachments?.map((attachment) =>
              attachment.type === "video" ? (
                <video key={attachment.url} src={attachment.url} controls />
              ) : (
                <img
                  key={attachment.url}
                  src={attachment.url}
                  alt="attachment"
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonsGroup}>
          <button className={styles.button}>Левый</button>
          <button className={styles.button}>Центр</button>
          <button className={styles.button}>Правый</button>
        </div>
        <div className={styles.buttonsIconButtons}>
          <button className={styles.iconButton}>
            <ArrowRight className={styles.icon} />
          </button>
          <button className={styles.iconButton}>
            <FileText className={styles.icon} />
          </button>
          <button className={styles.iconButton}>
            <Settings className={styles.icon} />
          </button>
          <button
            onClick={() => {
              addTofavourites?.(id);
              setIsFavorites(!isFavorites);
            }}
            className={styles.iconButtonStar}
          >
            <Star
              fill={isFavorites ? "#1a81ef" : "none"}
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
