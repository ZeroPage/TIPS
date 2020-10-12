-- Foreign keys will be removed soon. They are provided just for easy understanding of relations.

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

	good_vote BIGINT NOT NULL DEFAULT 0,
	bad_vote BIGINT NOT NULL DEFAULT 0,
	hard_vote BIGINT NOT NULL DEFAULT 0,
	easy_vote BIGINT NOT NULL DEFAULT 0,

	FOREIGN KEY(category_id) REFERENCES problem_category(category_id),
	FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS solve;
CREATE TABLE solve(
	solve_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	problem_id BIGINT NOT NULL,
	member_id BIGINT NOT NULL,

	content LONGTEXT NOT NULL,
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	duration TIME NOT NULL,

	FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
	FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS answer;
CREATE TABLE answer(
	answer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	member_id BIGINT NOT NULL,
	problem_id BIGINT NOT NULL,

	content LONGTEXT NOT NULL,
	reference VARCHAR(4096),
	created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

	good_vote BIGINT NOT NULL DEFAULT 0,
	bad_vote BIGINT NOT NULL DEFAULT 0,

	FOREIGN KEY(member_id) REFERENCES member(member_id),
	FOREIGN KEY(problem_id) REFERENCES problem(problem_id)
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

	good_vote BIGINT NOT NULL DEFAULT 0,
	bad_vote BIGINT NOT NULL DEFAULT 0,

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

	good_vote BIGINT NOT NULL DEFAULT 0,
	bad_vote BIGINT NOT NULL DEFAULT 0,

	FOREIGN KEY(parent_id) REFERENCES comment(comment_id),
	FOREIGN KEY(member_id) REFERENCES member(member_id),
	FOREIGN KEY(problem_id) REFERENCES problem(problem_id),
	FOREIGN KEY(answer_id) REFERENCES answer(answer_id),
	FOREIGN KEY(document_id) REFERENCES document(document_id)
);

-- Test
INSERT INTO member(username, nickname, email, password, is_admin) VALUES('admin', 'admin', 'admin@test.test', 'admin', 1);
INSERT INTO member(username, nickname, email, password) VALUES('test', 'test', 'test@test.test', 'test');

INSERT INTO problem_category(name) VALUES('os');
INSERT INTO problem_category(name) VALUES('network');

INSERT INTO problem(category_id, member_id, title, content) VALUES(1, 1, 'problem', 'problem');
INSERT INTO problem(category_id, member_id, title, content) VALUES(1, 1, 'problem 2', 'problem 2');

INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve', '00:10:00');
INSERT INTO solve(problem_id, member_id, content, duration) VALUES(1, 2, 'solve 2', '00:05:00');

INSERT INTO answer(member_id, problem_id, content) VALUES(1, 1, 'answer');
INSERT INTO answer(member_id, problem_id, content) VALUES(2, 1, 'answer 2');

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
INSERT INTO comment(parent_id, member_id, document_id, content) VALUES(1, 2, 1, 'comment 2');
