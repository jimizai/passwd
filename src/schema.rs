table! {
  users (id) {
      id -> Integer,
      username -> Text,
      email -> Text,
      password -> Text,
  }
}

table! {
  passwords (id) {
      id -> Integer,
      key -> Text,
      value -> Text,
      length -> Integer,
      user_id -> Integer,
  }
}
