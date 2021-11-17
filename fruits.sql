create table fruit_basket(
    id serial not null primary key,
    fruit_type varchar(50) not null,
    fruit_quantity int not null,
    fruit_price decimal(12, 2) not null
)