create database isa_test;
\l                #Listar las bases de datos.
\c isa_test       # Cambiar de DB

#Creamos la tabla Productos
CREATE OR REPLACE FUNCTION create_mytable()
  RETURNS void
  LANGUAGE plpgsql AS
$func$
BEGIN
   IF EXISTS (SELECT FROM pg_catalog.pg_tables 
              WHERE  schemaname = 'myschema'
              AND    tablename  = 'Productos') THEN
      RAISE NOTICE 'Table myschema.Productos already exists.';
   ELSE
    create table Productos(
        idProducto INT GENERATED ALWAYS AS IDENTITY,
        nombre VARCHAR(100) NOT NULL,
        precio int,
        descripcion VARCHAR(100) NOT NULL,
        PRIMARY KEY(idProducto)
    );
   END IF;
   IF EXISTS (SELECT FROM pg_catalog.pg_tables 
              WHERE  schemaname = 'myschema'
              AND    tablename  = 'detalleProductos') THEN
      RAISE NOTICE 'Table myschema.detalleProductos already exists.';
   ELSE
    #Creamos la tabla detalleProductos
    create table detalleProductos(
        idDetalleProducto INT GENERATED ALWAYS AS IDENTITY,
        idProducto INT,
        cantidad DECIMAL(18,2),
        valorTotal DECIMAL(18,2),
        valorIva DECIMAL(18,2),
        CONSTRAINT fk_productos
        FOREIGN KEY(idProducto) 
        REFERENCES Productos(idProducto)
    );

     alter table detalleProductos add constraint UQ_idProduct unique (idProducto);
   END IF;
END
$func$;

#Creamos las Tablas. 
SELECT create_mytable();        -- call as many times as you want. 

\dt                  #Lista mis tablas.
