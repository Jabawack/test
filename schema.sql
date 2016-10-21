CREATE TABLE users (
  id bigserial,
  uid text primary key,
  pw text NOT null,
  email text NOT null,
  q1 bigint NOT null,
  a1 text NOT null,
  q2 bigint NOT null,
  a2 text NOT null,
  mobile text NOT null,
  addr text NOT null,
  interest text NOT null,
  created_at timestamptz,
  updated_at timestamptz,
  deleted_at timestamptz
);

insert into users (uid, pw, email, q1, a1, q2, a2, mobile, addr, interest) values ('abc', 'password', 'email@email.com', 1, 'abc', 2, 'abc', '123-456-7890','abc','abc');
insert into users (uid, pw, email, q1, a1, q2, a2, mobile, addr, interest) values ('abcd', 'password', 'email@email.com', 1, 'abc', 2, 'abc', '123-456-7890','abc','abc');
