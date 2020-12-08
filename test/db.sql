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

    username VARCHAR(255) NOT NULL UNIQUE KEY,
    nickname VARCHAR(255) NOT NULL UNIQUE KEY,
    email VARCHAR(255) NOT NULL UNIQUE KEY,
    password VARCHAR(255) NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    is_admin TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_admin IN (0, 1)),
    is_prime TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_prime IN (0, 1)),

    KEY(created),
    KEY(is_admin),
    KEY(is_prime)
);

DROP TABLE IF EXISTS class;
CREATE TABLE class(
    class_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL UNIQUE KEY,
    description LONGTEXT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    is_default TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_default IN (0, 1)),
    is_admin TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_admin IN (0, 1)),
    is_prime TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_prime IN (0, 1)),

    KEY(created),
    KEY(is_default),
    KEY(is_admin),
    KEY(is_prime)
);

DROP TABLE IF EXISTS class_member;
CREATE TABLE class_member(
    class_member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    class_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY(class_id, member_id),

    KEY(created),

    FOREIGN KEY(class_id) REFERENCES class(class_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);


DROP TABLE IF EXISTS problem_category;
CREATE TABLE problem_category(
    category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,

    name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,

    KEY(name),

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
    hint VARCHAR(4096),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY(title),
    KEY(time_limit),
    KEY(created),

    FOREIGN KEY(category_id) REFERENCES problem_category(category_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS solve;
CREATE TABLE solve(
    solve_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,

    content LONGTEXT NOT NULL,
    duration SMALLINT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY(duration),
    KEY(created),

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

    KEY(created),

    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);


DROP TABLE IF EXISTS board;
CREATE TABLE board(
    board_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL UNIQUE KEY,
    description LONGTEXT NOT NULL
);

DROP TABLE IF EXISTS document_category;
CREATE TABLE document_category(
    category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,
    board_id BIGINT NOT NULL,

    name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,

    KEY(name),

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

    KEY(title),
    KEY(created),

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

    KEY(created),

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

    type CHAR(1) NOT NULL CHECK(type IN ('u', 'd')),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY(member_id, problem_id),
    UNIQUE KEY(member_id, answer_id),
    UNIQUE KEY(member_id, document_id),
    UNIQUE KEY(member_id, comment_id),

    KEY(type),
    KEY(created),

    FOREIGN KEY(member_id) REFERENCES member(member_id),
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
    FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
    FOREIGN KEY(document_id) REFERENCES document(document_id),
    FOREIGN KEY(comment_id) REFERENCES comment(comment_id)
);

DROP TABLE IF EXISTS difficulty;
CREATE TABLE difficulty(
    difficulty_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    problem_id BIGINT NOT NULL,

    score TINYINT(1) NOT NULL CHECK(score >= 1 AND score <= 5),
    description VARCHAR(255),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY(member_id, problem_id),

    KEY(score),
    KEY(created),

    FOREIGN KEY(member_id) REFERENCES member(member_id),
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id)
);


-- Test
INSERT INTO member(username, nickname, email, password, is_admin) VALUES('admin', 'admin', 'admin@test.test', '$2b$10$Yqae9guCSOF66IcMzAy2RuYmExWv9YLvYt3gRrrltV0J2OxLIeLP6', 1);
INSERT INTO member(username, nickname, email, password, is_prime) VALUES('test', 'test', 'test@test.test', '$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG', 1);
INSERT INTO member(username, nickname, email, password) VALUES('test2', 'test2', 'test2@test.test', '$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG');

INSERT INTO class(name, description, is_default) VALUES('default', 'default', 1);
INSERT INTO class(name, description, is_admin) VALUES('admin', 'admin', 1);
INSERT INTO class(name, description, is_prime) VALUES('prime', 'prime', 1);

INSERT INTO class_member(class_id, member_id) VALUES(1, 1);
INSERT INTO class_member(class_id, member_id) VALUES(2, 1);
INSERT INTO class_member(class_id, member_id) VALUES(1, 2);
INSERT INTO class_member(class_id, member_id) VALUES(3, 2);
INSERT INTO class_member(class_id, member_id) VALUES(1, 3);

INSERT INTO problem_category(name, description) VALUES('os', 'os');
INSERT INTO problem_category(name, description) VALUES('network', 'network');

INSERT INTO problem(category_id, member_id, title, content, time_limit, reference, hint) VALUES(1, 1, 'problem', 'problem', 30, 'reference', 'hint');
INSERT INTO problem(category_id, member_id, title, content, time_limit, reference, hint) VALUES(1, 1, 'problem 2', 'problem 2', 120, 'reference 2', 'hint 2');

INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve', '60');
INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve 2', '30');

INSERT INTO answer(problem_id, member_id, content, reference) VALUES(1, 1, 'answer', 'reference');
INSERT INTO answer(problem_id, member_id, content, reference) VALUES(1, 2, 'answer 2', 'reference 2');

INSERT INTO board(name, description) VALUES('notice', 'notice');
INSERT INTO board(name, description) VALUES('free', 'free');
INSERT INTO board(name, description) VALUES('qna', 'qna');

INSERT INTO document_category(board_id, name, description) VALUES(1, 'default', 'default');
INSERT INTO document_category(board_id, name, description) VALUES(2, 'default', 'default');
INSERT INTO document_category(board_id, name, description) VALUES(3, 'default', 'default');

INSERT INTO document(board_id, category_id, member_id, title, content, reference) VALUES(1, 1, 1, 'notice', 'notice', 'reference');
INSERT INTO document(board_id, category_id, member_id, title, content, reference) VALUES(2, 1, 2, 'free', 'free', 'reference');
INSERT INTO document(board_id, category_id, member_id, title, content, reference) VALUES(3, 1, 2, 'qna', 'qna', 'reference');

INSERT INTO comment(parent_id, member_id, document_id, content) VALUES(NULL, 2, 1, 'comment');
INSERT INTO comment(parent_id, member_id, document_id, content) VALUES(1, 1, 1, 'comment 2');

INSERT INTO vote(member_id, problem_id, type) VALUES(1, 1, 'u');
INSERT INTO vote(member_id, answer_id, type) VALUES(1, 2, 'u');
INSERT INTO vote(member_id, document_id, type) VALUES(2, 1, 'd');
INSERT INTO vote(member_id, comment_id, type) VALUES(2, 2, 'u');

INSERT INTO difficulty(member_id, problem_id, score, description) VALUES(1, 1, 4, '4 stars');
INSERT INTO difficulty(member_id, problem_id, score, description) VALUES(2, 1, 2, '2 stars');
