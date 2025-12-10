USE eventdb;

DROP TABLE IF EXISTS event_comments;
DROP TABLE IF EXISTS event_favorites;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS event_images;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS event_locations;
DROP TABLE IF EXISTS event_categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    email          VARCHAR(255) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    full_name      VARCHAR(100) NOT NULL,
    avatar_url     VARCHAR(500),
    bio            TEXT,
    birthdate      DATE,
    gender         VARCHAR(10),
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_categories (
    category_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    description    TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_locations (
    location_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    district       VARCHAR(255) NOT NULL,
    address        VARCHAR(255) NOT NULL,
    city           VARCHAR(100) NOT NULL,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE events (
    event_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    category_id     BIGINT,
    location_id     BIGINT,
    start_datetime  TIMESTAMP NOT NULL,
    end_datetime    TIMESTAMP NOT NULL,
    price           DECIMAL(10,2) NOT NULL DEFAULT 0,
    status          VARCHAR(20) NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_events_category
        FOREIGN KEY (category_id)
        REFERENCES event_categories (category_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_events_location
        FOREIGN KEY (location_id)
        REFERENCES event_locations (location_id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_images (
    image_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id       BIGINT NOT NULL,
    image_url      VARCHAR(500) NOT NULL,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_event_images_event
        FOREIGN KEY (event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_registrations (
    registration_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    event_id        BIGINT NOT NULL,
    registered_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(20) NOT NULL,
    note            TEXT,

    CONSTRAINT fk_reg_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reg_event
        FOREIGN KEY (event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_reg_user_event
        UNIQUE (user_id, event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_favorites (
    user_id      BIGINT NOT NULL,
    event_id     BIGINT NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, event_id),

    CONSTRAINT fk_fav_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_fav_event
        FOREIGN KEY (event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_comments (
    comment_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id      BIGINT NOT NULL,
    user_id       BIGINT NOT NULL,
    rating        INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment       TEXT,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_comment_event
        FOREIGN KEY (event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INDEXES
CREATE INDEX idx_events_datetime ON events (start_datetime);
CREATE INDEX idx_events_status   ON events (status);

CREATE INDEX idx_reg_user  ON event_registrations (user_id);
CREATE INDEX idx_reg_event ON event_registrations (event_id);

CREATE INDEX idx_fav_user  ON event_favorites (user_id);
CREATE INDEX idx_fav_event ON event_favorites (event_id);

CREATE INDEX idx_comment_event ON event_comments (event_id);
CREATE INDEX idx_comment_user  ON event_comments (user_id);

-- SAMPLE DATA
-- USERS
INSERT INTO users (email, password_hash, full_name, avatar_url, bio, birthdate, gender)
VALUES
('user1@example.com','pw1','田中花子',NULL,'東京出身のイベント好きです','2000-01-01','female'),
('user2@example.com','pw2','佐藤太郎',NULL,'音楽とスポーツが大好き','1999-02-15','male'),
('user3@example.com','pw3','鈴木一郎',NULL,'アウトドア活動を楽しんでいます','1998-03-20','male'),
('user4@example.com','pw4','高橋美咲',NULL,'アートとフェスティバルに興味があります','2001-04-10','female'),
('user5@example.com','pw5','渡辺健太',NULL,'料理とワークショップが好き','1997-05-05','male'),
('user6@example.com','pw6','伊藤さくら',NULL,'子供向けイベントの企画者','2002-06-18','female'),
('user7@example.com','pw7','山本大輔',NULL,'科学とテクノロジーに情熱を持っています','1996-07-22','male'),
('user8@example.com','pw8','中村愛',NULL,'コミュニティイベントのボランティア','2000-08-30','female'),
('user9@example.com','pw9','小林誠',NULL,'フードフェスティバルが大好き','1995-09-09','male'),
('user10@example.com','pw10','加藤結衣',NULL,'音楽フェスティバルの常連','1998-10-25','female');

-- CATEGORIES
INSERT INTO event_categories (name, description)
VALUES
('子供向け','子供と家族のためのイベント'),
('音楽','コンサートと音楽イベント'),
('アウトドア','野外活動とアドベンチャー'),
('スポーツ','スポーツイベントと競技'),
('料理','グルメとフードフェスティバル'),
('ワークショップ','学習とスキルアップのワークショップ'),
('アート','美術展とアート関連イベント'),
('フェスティバル','文化祭とお祭り'),
('コミュニティ','地域コミュニティのイベント'),
('科学','科学技術と教育イベント');

-- LOCATIONS
INSERT INTO event_locations (district, address, city)
VALUES
('Hai Ba Trung','渋谷1-1-1','Ha Noi'),
('Ba Vi','新宿2-2-2','Ha Noi'),
('Cau Giay','千代田3-3-3','Ha Noi'),
('Con Dao','梅田4-4-4','Ho Chi Minh'),
('Binh Duong','本町5-5-5','Ho Chi Minh'),
('Cho Lon','西6-6-6','Ho Chi Minh'),
('Hoi An','栄7-7-7','Da Nang'),
('Hoi An','東8-8-8','Da Nang'),
('Dan Dien','博多9-9-9','Hue'),
('Trung Khanh','天神10-10-10','Cao Bang');

-- EVENTS (MySQL datetime)
INSERT INTO events (title, description, category_id, location_id, start_datetime, end_datetime, price, status)
VALUES
('親子で楽しむ冬のフェスティバル','家族みんなで楽しめる冬のイベントです。様々なアクティビティをご用意しています。',1,1,NOW(),DATE_ADD(NOW(), INTERVAL 2 HOUR),10,'published'),
('春の音楽祭2025','有名アーティストが集まる音楽イベント。素晴らしい音楽体験をお楽しみください。',2,2,NOW(),DATE_ADD(NOW(), INTERVAL 3 HOUR),20,'draft'),
('桜の下でピクニック','春の桜の下で自然を満喫しましょう。無料で参加できます。',3,3,NOW(),DATE_ADD(NOW(), INTERVAL 4 HOUR),0,'published'),
('マラソン大会','市民参加型のマラソンイベント。初心者から上級者まで歓迎します。',4,4,NOW(),DATE_ADD(NOW(), INTERVAL 1 HOUR),5,'cancelled'),
('和食料理教室','プロのシェフから本格的な和食を学びましょう。',5,5,NOW(),DATE_ADD(NOW(), INTERVAL 5 HOUR),15,'draft'),
('陶芸ワークショップ','初心者向けの陶芸体験。自分だけの作品を作りましょう。',6,6,NOW(),DATE_ADD(NOW(), INTERVAL 6 HOUR),8,'finished'),
('現代アート展示会','最新の現代アート作品を展示。入場無料です。',7,7,NOW(),DATE_ADD(NOW(), INTERVAL 2 HOUR),0,'published'),
('夏祭り花火大会','伝統的な夏祭りと盛大な花火をお楽しみください。',8,8,NOW(),DATE_ADD(NOW(), INTERVAL 3 HOUR),30,'published'),
('地域清掃ボランティア','地域をきれいにするボランティア活動。一緒に街を美しくしましょう。',9,9,NOW(),DATE_ADD(NOW(), INTERVAL 1 HOUR),12,'draft'),
('子供向けロボット教室','プログラミングとロボット工学を楽しく学ぼう。',10,10,NOW(),DATE_ADD(NOW(), INTERVAL 4 HOUR),7,'published');

-- IMAGES
INSERT INTO event_images (event_id, image_url)
VALUES
(1,'https://cdn.pixabay.com/photo/2020/04/30/17/44/holiday-5113866_1280.jpg'),
(1,'https://cdn.pixabay.com/photo/2025/01/11/16/24/cowboy-9326351_1280.jpg'),
(1,'https://cdn.pixabay.com/photo/2020/07/04/11/16/united-rice-5369221_1280.jpg'),
(2,'https://cdn.pixabay.com/photo/2020/03/07/02/28/bread-soup-4908531_1280.jpg'),
(2,'https://cdn.pixabay.com/photo/2020/03/07/02/27/bread-soup-4908526_1280.jpg'),
(2,'https://cdn.pixabay.com/photo/2017/08/31/19/54/qatar-2702050_1280.jpg'),
(3,'https://cdn.pixabay.com/photo/2017/08/31/19/54/qatar-2702052_1280.jpg'),
(3,'https://cdn.pixabay.com/photo/2013/12/25/16/01/oil-etc-233594_1280.jpg'),
(3,'https://cdn.pixabay.com/photo/2014/07/26/05/19/seoul-402048_1280.jpg'),
(4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCauOQAXfzPtVtztPvdpJhemb6g0oS94Taug&s'),
(4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3NAS3MS_SLDFllMTkx1qGQ_OXABRjEoPWMQ&s'),
(4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQufVfJXWKHoUv7FzGY-5bzldVjsBw544lrjA&s'),
(5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSchmB22nE3NQbHUkj-iTQWXK55kB3aQCnPbA&s'),
(5,'https://i.ytimg.com/vi/JZ7ubnzpDIg/maxresdefault.jpg'),
(5,'https://i.ytimg.com/vi/N0AACfqLD9U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA7OGo557xw5qsa1E-DQ4GCUPOdbg'),
(6,'https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/11/10/57683275112223075755215012239416364634618730n-17627599581561869764536.jpg'),
(6,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwSnWkAHy80qtVoIOtvOGW5PlPLd_6M-tBg&s'),
(6,'https://blog.coccoc.com/wp-content/uploads/2024/11/doi-tuyen-t1-va-faker-1024x576.webp'),
(7,'https://bom.edu.vn/public/upload/2024/12/avatar-vo-tri-meo-5.webp'),
(7,'https://inbat.vn/wp-content/uploads/2024/10/avatar-vo-tri-meo-1.jpg'),
(7,'https://dimensions.edu.vn/upload/2025/01/anh-meme-vo-tri-16.webp'),
(8,'https://hnm.1cdn.vn/thumbs/1200x630/2020/11/14/nhipsonghanoi.hanoimoi.com.vn-uploads-images-phananh-2020-11-12-_ho-tay.jpg'),
(8,'https://static.vinwonders.com/production/ho-tay-o-dau-2.jpg'),
(8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDUhl0OyDh0iWSHAGKJduNLIjtKI6x6sP6ZQ&s'),
(9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6G__zHE9uIj3U49op7L-cgacUIRjLCxPTKA&s'),
(9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kPPO9Km2YW0HrV1VqdThjG5El8CJcxZ1mw&s'),
(9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbwhAmxyn59PatAU1UsGnL47qfozXx2WwQOQ&s'),
(10,'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-25/432783453_981045163377877_5109057339270071183_n-1711336325-671-width1440height960.jpg'),
(10,'https://i.ytimg.com/vi/z5Frtht-w7E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBCctN9OZdlpdara7wlCY2X5hOLBQ'),
(10,'https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c807850d1d162bd4d2cc37df4486ad42f3131004eb6f8ad031ca3c5d8695ffa3bf647d1d175058d9a59d4e21100ddb41c54c45/anh-11-4189.jpg');

-- REGISTRATIONS
INSERT INTO event_registrations (user_id, event_id, status, note)
VALUES
(1,1,'confirmed','子供2人と参加します'),
(2,2,'pending','友人と一緒に参加予定'),
(3,3,'confirmed','お弁当持参します'),
(4,4,'cancelled','予定が変わりました'),
(5,5,'confirmed','アレルギー情報:なし'),
(6,6,'pending','材料は持参しますか？'),
(7,7,'confirmed','初めての参加です'),
(8,8,'attended','とても楽しかったです'),
(9,9,'confirmed','車で行きます'),
(10,10,'confirmed','子供向けの内容ですか？');

-- FAVORITES
INSERT INTO event_favorites (user_id, event_id)
VALUES
(1,1),(1,2),(2,3),(3,4),(4,5),
(5,6),(6,7),(7,8),(8,9),(9,10);

-- COMMENTS
INSERT INTO event_comments (event_id, user_id, rating, comment)
VALUES
(1,1,5,'素晴らしいイベントでした！子供たちも大喜びでした。'),
(2,2,4,'とても良い音楽体験ができました。また参加したいです。'),
(3,3,5,'最高のピクニック日和でした。桜がとてもきれいでした。'),
(4,4,3,'中止になって残念でしたが、対応は良かったです。'),
(5,5,5,'料理教室が最高でした！シェフの説明がとてもわかりやすかったです。'),
(6,6,4,'楽しい陶芸体験ができました。作品も満足のいく出来です。'),
(7,7,5,'完璧なアート展示でした。現代アートの新しい視点を得られました。'),
(8,8,3,'悪くはないですが、混雑していました。'),
(9,9,4,'地域のために役立てて嬉しかったです。'),
(10,10,5,'素晴らしいロボット教室でした！子供が夢中になっていました。');