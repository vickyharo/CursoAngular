export interface Node {
    CodigoRetorno: number;
    DescripcionRetorno: string;
    IdRegimen: number;
    Fideicomiso: number;
    IdPadre: number;
    IdAdmonInmueble: number;
    Superficie: number;
    Publico: number;
    MetrosVendibles: number;
    Utilizados: number;
    Disponibles: number;
    Nivel: number;
    Seq: number;
    Descripcion: string;

    children?: Node[]; // ⬅ para construir la jerarquía localmente
    expanded?: boolean;
}
