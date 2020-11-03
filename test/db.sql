-- Foreign keys will be removed soon. They are provided just for easy understanding of relations.
-- Triggers will be added soon.

DROP DATABASE IF EXISTS tips;
CREATE DATABASE tips;
USE tips;

GRANT ALL PRIVILEGES ON tips.* TO 'tips'@'localhost' IDENTIFIED BY 'tips';
GRANT ALL PRIVILEGES ON tips.* TO 'tips'@'127.0.0.1' IDENTIFIED BY 'tips';
GRANT ALL PRIVILEGES ON tips.* TO 'tips'@'::1' IDENTIFIED BY 'tips';
FLUSH PRIVILEGES;


DROP TABLE IF EXISTS member;
CREATE TABLE member(
    member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE KEY,
    nickname VARCHAR(40) NOT NULL UNIQUE KEY,
    email VARCHAR(180) NOT NULL UNIQUE KEY,
    password VARCHAR(60) NOT NULL,
    is_admin TINYINT(1) NOT NULL DEFAULT 0,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS class;
CREATE TABLE class(
    class_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE KEY,
    is_default TINYINT(1) NOT NULL DEFAULT 0,
    is_admin TINYINT(1) NOT NULL DEFAULT 0,
    is_prime TINYINT(1) NOT NULL DEFAULT 0,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS class_member;
CREATE TABLE class_member(
    class_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(class_id, member_id),
    FOREIGN KEY(class_id) REFERENCES class(class_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);


DROP TABLE IF EXISTS problem_category;
CREATE TABLE problem_category(
    category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,
    name VARCHAR(255) NOT NULL,

    FOREIGN KEY(parent_id) REFERENCES problem_category(category_id)
);

DROP TABLE IF EXISTS problem;
CREATE TABLE problem(
    problem_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    time_limit SMALLINT NOT NULL DEFAULT 0,
    reference VARCHAR(4096),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    vote BIGINT NOT NULL DEFAULT 0,
    difficulty TINYINT(1) NOT NULL CHECK(difficulty >= 1 AND difficulty <= 5),

    FOREIGN KEY(category_id) REFERENCES problem_category(category_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS solve;
CREATE TABLE solve(
    solve_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    content LONGTEXT NOT NULL,
    duration TIME NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS answer;
CREATE TABLE answer(
    answer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    content LONGTEXT NOT NULL,
    reference VARCHAR(4096),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    vote BIGINT NOT NULL DEFAULT 0,

    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);


DROP TABLE IF EXISTS board;
CREATE TABLE board(
    board_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS document_category;
CREATE TABLE document_category(
    category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,
    board_id BIGINT NOT NULL,

    name VARCHAR(255) NOT NULL,

    FOREIGN KEY(parent_id) REFERENCES document_category(category_id),
    FOREIGN KEY(board_id) REFERENCES board(board_id)
);

DROP TABLE IF EXISTS document;
CREATE TABLE document(
    document_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    reference VARCHAR(4096),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    vote BIGINT NOT NULL DEFAULT 0,

    FOREIGN KEY(board_id) REFERENCES board(board_id),
    FOREIGN KEY(category_id) REFERENCES document_category(category_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
    comment_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,
    member_id BIGINT NOT NULL,

    problem_id BIGINT,
    answer_id BIGINT,
    document_id BIGINT,

    content LONGTEXT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    vote BIGINT NOT NULL DEFAULT 0,

    FOREIGN KEY(parent_id) REFERENCES comment(comment_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id),
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
    FOREIGN KEY(document_id) REFERENCES document(document_id)
);


DROP TABLE IF EXISTS vote;
CREATE TABLE vote(
    vote_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,

    problem_id BIGINT,
    answer_id BIGINT,
    document_id BIGINT,
    comment_id BIGINT,

    type VARCHAR(10) NOT NULL CHECK(type IN ('good', 'bad')),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(member_id) REFERENCES member(member_id),
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
    FOREIGN KEY(document_id) REFERENCES document(document_id),
    FOREIGN KEY(comment_id) REFERENCES comment(comment_id)
);

DROP TABLE IF EXISTS difficulty;
CREATE TABLE difficulty(
    difficulty_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    difficulty TINYINT(1) NOT NULL CHECK(difficulty >= 1 AND difficulty <= 5),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);


-- Test
INSERT INTO member(username, nickname, email, password, is_admin) VALUES('admin', 'admin', 'admin@test.test', '$2b$10$Yqae9guCSOF66IcMzAy2RuYmExWv9YLvYt3gRrrltV0J2OxLIeLP6', 1);
INSERT INTO member(username, nickname, email, password) VALUES('test', 'test', 'test@test.test', '$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG');
INSERT INTO member(username, nickname, email, password) VALUES('test2', 'test2', 'test2@test.test', '$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG');

INSERT INTO class(name, is_default) VALUES('default', 1);
INSERT INTO class(name, is_admin) VALUES('admin', 1);
INSERT INTO class(name, is_prime) VALUES('prime', 1);

INSERT INTO class_member(class_id, member_id) VALUES(1, 1);
INSERT INTO class_member(class_id, member_id) VALUES(2, 1);
INSERT INTO class_member(class_id, member_id) VALUES(1, 2);
INSERT INTO class_member(class_id, member_id) VALUES(3, 2);
INSERT INTO class_member(class_id, member_id) VALUES(1, 3);

INSERT INTO problem_category(name) VALUES('os');
INSERT INTO problem_category(name) VALUES('network');

INSERT INTO problem(category_id, member_id, title, content, difficulty) VALUES(1, 1, 'problem', 'problem', 3);
INSERT INTO problem(category_id, member_id, title, content, difficulty) VALUES(1, 1, 'problem 2', 'problem 2', 3);

INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve', '00:10:00');
INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve 2', '00:05:00');

INSERT INTO answer(problem_id, member_id, content) VALUES(1, 1, 'answer');
INSERT INTO answer(problem_id, member_id, content) VALUES(1, 2, 'answer 2');

INSERT INTO board(name) VALUES('notice');
INSERT INTO board(name) VALUES('free');
INSERT INTO board(name) VALUES('qna');

INSERT INTO document_category(board_id, name) VALUES(1, 'default');
INSERT INTO document_category(board_id, name) VALUES(2, 'default');
INSERT INTO document_category(board_id, name) VALUES(3, 'default');

INSERT INTO document(board_id, category_id, member_id, title, content) VALUES(1, 1, 1, 'notice', 'notice');
INSERT INTO document(board_id, category_id, member_id, title, content) VALUES(2, 1, 2, 'free', 'free');
INSERT INTO document(board_id, category_id, member_id, title, content) VALUES(3, 1, 2, 'qna', 'qna');

INSERT INTO comment(parent_id, member_id, document_id, content) VALUES(NULL, 2, 1, 'comment');
INSERT INTO comment(parent_id, member_id, document_id, content) VALUES(1, 1, 1, 'comment 2');

INSERT INTO vote(member_id, problem_id, type) VALUES(1, 1, 'good');
INSERT INTO vote(member_id, answer_id, type) VALUES(1, 2, 'good');
INSERT INTO vote(member_id, document_id, type) VALUES(2, 1, 'bad');
INSERT INTO vote(member_id, comment_id, type) VALUES(2, 2, 'good');

INSERT INTO difficulty(problem_id, member_id, difficulty) VALUES(1, 1, 4);
INSERT INTO difficulty(problem_id, member_id, difficulty) VALUES(1, 2, 2);
