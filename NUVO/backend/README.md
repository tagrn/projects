# Backend

## MySQL

## 계정, 스키마

- root
- yacht

## User 관련 테이블

### users 테이블

```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| email    | varchar(50)  | YES  | UNI | NULL    |                |
| password | varchar(120) | YES  |     | NULL    |                |
| username | varchar(20)  | YES  | UNI | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

```

### roles 테이블

```
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int(11)     | NO   | PRI | NULL    | auto_increment |
| name  | varchar(20) | YES  |     | NULL    |                |
+-------+-------------+------+-----+---------+----------------+
```

### user_roles 테이블

```
+---------+------------+------+-----+---------+-------+
| Field   | Type       | Null | Key | Default | Extra |
+---------+------------+------+-----+---------+-------+
| user_id | bigint(20) | NO   | PRI | NULL    |       |
| role_id | int(11)    | NO   | PRI | NULL    |       |
+---------+------------+------+-----+---------+-------+
```

| 여기에 role 3개 추가

```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```
