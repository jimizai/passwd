#![allow(proc_macro_derive_resolution_fallback)]

table! {
  users (id) {
      id -> Integer,
      username -> Text,
      email -> Text,
  }
}

// table! {
//   passwords (id) {
//     id -> Int4,
//     key -> Text,
//     value -> Text,
//     length -> Int4,
//     type -> Text,
//   }
// }
