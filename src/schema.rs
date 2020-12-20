table! {
  users (id) {
      id -> Int4,
      username -> Text,
      email -> Text,
  }
}

table! {
  passwords (id) {
    id -> Int4,
    key -> Text,
    value -> Text,
    length -> Int4,
    type -> Text,
  }
}
