-- Inventario de la camiseta edición limitada (stock físico que envía la banda).
-- Se ejecuta una vez en el editor SQL de Supabase. Las cantidades se editan después a mano
-- en la tabla «stock» (Table Editor), por ejemplo tras vender en un bolo.

create table if not exists stock (
  sku text primary key,              -- «slug:variante», p. ej. edicion-limitada-p62:white-m
  cantidad integer not null check (cantidad >= 0)
);

-- Cada pago abierto en Stripe reserva sus unidades 30 minutos; si no se paga, vuelven al stock.
create table if not exists reservas (
  session_id text not null,
  sku text not null references stock(sku),
  cantidad integer not null check (cantidad > 0),
  estado text not null default 'reservada' check (estado in ('reservada', 'vendida', 'liberada')),
  creada timestamptz not null default now(),
  primary key (session_id, sku)
);

alter table stock enable row level security;
alter table reservas enable row level security;
-- Sin políticas: solo la clave de servicio (servidor de la web) puede leer y escribir.

-- Reserva todo o nada: si alguna talla no llega, no se reserva ninguna.
create or replace function reservar_stock(p_session text, p_items jsonb)
returns boolean language plpgsql security definer as $$
declare it jsonb;
begin
  for it in select * from jsonb_array_elements(p_items) loop
    update stock set cantidad = cantidad - (it->>'cantidad')::int
      where sku = it->>'sku' and cantidad >= (it->>'cantidad')::int;
    if not found then
      raise exception 'agotada: %', it->>'sku';
    end if;
    insert into reservas (session_id, sku, cantidad) values (p_session, it->>'sku', (it->>'cantidad')::int);
  end loop;
  return true;
exception when others then
  return false; -- deshace todo lo reservado en esta llamada
end $$;

create or replace function liberar_stock(p_session text)
returns void language plpgsql security definer as $$
begin
  update stock s set cantidad = s.cantidad + r.cantidad
    from reservas r where r.session_id = p_session and r.sku = s.sku and r.estado = 'reservada';
  update reservas set estado = 'liberada' where session_id = p_session and estado = 'reservada';
end $$;

create or replace function confirmar_stock(p_session text)
returns void language sql security definer as $$
  update reservas set estado = 'vendida' where session_id = p_session and estado = 'reservada';
$$;

-- Cantidades iniciales (PENDIENTE: poner las reales antes de activar la venta)
insert into stock (sku, cantidad) values
  ('edicion-limitada-p62:white-s', 0),
  ('edicion-limitada-p62:white-m', 0),
  ('edicion-limitada-p62:white-l', 0),
  ('edicion-limitada-p62:white-xl', 0),
  ('edicion-limitada-p62:white-xxl', 0)
on conflict (sku) do nothing;
