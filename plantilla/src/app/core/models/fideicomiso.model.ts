export interface Fideicomiso {
    id: string;
    nombre: string;
    tipo: string; // se relaciona con 'tipoInmueble'
    calle: string;
    noExt?: string;
    noInt?: string;
    colonia?: string;
    cp: string;
    pais?: string;
    estado?: string;
    ciudad?: string;
    superficie?: number;
    valorTotal?: number;
    estatus?: 'activo' | 'inactivo';
    inmuebleConcesion?: boolean
    inmuebleEmbargo?: boolean
    inmuebleCredito?: boolean
    fechaRegistro?: string;
}
