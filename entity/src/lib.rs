pub use sea_orm;

pub mod prelude;
pub mod user;
pub mod user_group;
pub mod group;
pub mod profile;
pub mod profile_data;
pub mod activity;
pub mod test_case;
pub mod test_step;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
