CREATE TABLE users (
  id bigserial,
  userid text primary key,
  password text NOT null,
  email text NOT null,
  q1 bigint NOT null,
  a1 text NOT null,
  q2 bigint NOT null,
  a2 text NOT null,
  mobile text NOT null,
  address text NOT null,
  comments text NOT null,
  created_at timestamptz,
  updated_at timestamptz,
  deleted_at timestamptz
);

insert into users (userid, password, email, q1, a1, q2, a2, mobile, address, comments) values ('abc', 'password', 'email@email.com', 1, 'abc', 2, 'abc', '123-456-7890','abc','abc');
