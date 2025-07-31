import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Node } from '../models/view-tree.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/enviroment';

@Injectable({ providedIn: 'root' })
export class ViewTreeService {

    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
 * Obtiene desde un endpoint la estructura jerárquica asociada a un fideicomiso.
 * @param fideicomiso Número del fideicomiso
 * @param convertirAJerarquia Si es true, convierte el arreglo plano a jerárquico
 * @returns Observable con arreglo plano o jerárquico (según parámetro)
 */
    obtenerEstructuraPorFideicomiso(): Node[] {
       /* const url = `${this.baseUrl}/ejemplo/treenode/${fideicomiso}`; // 🔁 Sustituye con la ruta real

        return this.http.get<any>(url).pipe(
            map((respuesta: any) => {
                // 🔽 Aquí es donde llegaría la respuesta del backend
                // 🔁 Si deseas simular datos, puedes reemplazar la línea `respuesta` con datos hardcodeados así:
                // const respuesta = [{ IdAdmonInmueble: 1, IdPadre: 0, ... }, ...]

                if (convertirAJerarquia) {
                    return this.convertirAJerarquia(respuesta); // Transforma plano → árbol
                }
                return respuesta; // Retorna tal como viene del backend
            })
        );*/
        const rawData = [
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 16195,
                            "Superficie": 85.25,
                            "Publico": 0.00,
                            "MetrosVendibles": 85.25,
                            "Utilizados": 40.25,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 1,
                            "Descripcion": "LOTE"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 16196,
                            "Superficie": 85.25,
                            "Publico": 0.00,
                            "MetrosVendibles": 85.25,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 2,
                            "Descripcion": "LOTE"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15919,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 22,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15931,
                            "Superficie": 102.89,
                            "Publico": 0.00,
                            "MetrosVendibles": 102.89,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 23,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15936,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 24,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15941,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 25,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15947,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 26,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15948,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 27,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15949,
                            "Superficie": 80.24,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.24,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 28,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15969,
                            "Superficie": 91.83,
                            "Publico": 0.00,
                            "MetrosVendibles": 91.83,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 29,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15977,
                            "Superficie": 80.95,
                            "Publico": 0.00,
                            "MetrosVendibles": 80.95,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 30,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15980,
                            "Superficie": 114.84,
                            "Publico": 0.00,
                            "MetrosVendibles": 114.84,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 31,
                            "Descripcion": "UNIDAD PRIVATIVA"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 0,
                            "Fideicomiso": 30330,
                            "IdPadre": 30330,
                            "IdAdmonInmueble": 15992,
                            "Superficie": 96.18,
                            "Publico": 0.00,
                            "MetrosVendibles": 96.18,
                            "Utilizados": 0.00,
                            "Disponibles": 0,
                            "Nivel": 1,
                            "Seq": 32,
                            "Descripcion": "LOTE"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 659,
                            "Fideicomiso": 30330,
                            "IdPadre": 16219,
                            "IdAdmonInmueble": 16219,
                            "Superficie": 625.00,
                            "Publico": 156.00,
                            "MetrosVendibles": 150000.00,
                            "Utilizados": 150000.00,
                            "Disponibles": 0,
                            "Nivel": 2,
                            "Seq": 1,
                            "Descripcion": "DESARROLLO B"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 656,
                            "Fideicomiso": 30330,
                            "IdPadre": 16195,
                            "IdAdmonInmueble": 16195,
                            "Superficie": 40.25,
                            "Publico": 0.20,
                            "MetrosVendibles": 150000.00,
                            "Utilizados": 56.20,
                            "Disponibles": 0,
                            "Nivel": 2,
                            "Seq": 1,
                            "Descripcion": "TIP A"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 658,
                            "Fideicomiso": 30330,
                            "IdPadre": 16219,
                            "IdAdmonInmueble": 16219,
                            "Superficie": 1500.00,
                            "Publico": 683.80,
                            "MetrosVendibles": 2939.96,
                            "Utilizados": 2939.96,
                            "Disponibles": 0,
                            "Nivel": 2,
                            "Seq": 2,
                            "Descripcion": "DESARROLLO A"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 657,
                            "Fideicomiso": 30330,
                            "IdPadre": 656,
                            "IdAdmonInmueble": 16195,
                            "Superficie": 45.00,
                            "Publico": 0.20,
                            "MetrosVendibles": 54654989.00,
                            "Utilizados": 121.20,
                            "Disponibles": 0,
                            "Nivel": 3,
                            "Seq": 1,
                            "Descripcion": "Casa"
                        },
                        {
                            "CodigoRetorno": 0,
                            "DescripcionRetorno": "",
                            "IdRegimen": 660,
                            "Fideicomiso": 30330,
                            "IdPadre": 657,
                            "IdAdmonInmueble": 16195,
                            "Superficie": 1.00,
                            "Publico": 1.00,
                            "MetrosVendibles": 150.00,
                            "Utilizados": 1.00,
                            "Disponibles": 0,
                            "Nivel": 4,
                            "Seq": 1,
                            "Descripcion": "Casa"
                        }
                    ];
        return this.buildTree(rawData);
    }


    /**
      * Obtiene un arreglo desde un endpoint y lo transforma a jerarquía si es necesario.
      * @param path Ruta relativa del endpoint (por ejemplo: 'ejemplo/treenode')
      * @param convertirAJerarquia Si es true, convierte el arreglo plano en jerárquico
      * @returns Observable con el arreglo (jerárquico o plano)
      */
    getTreeFromEndpoint(path: string, convertirAJerarquia: boolean = true): Observable<Node[]> {
        const url = `${this.baseUrl}/${path}`;

        return this.http.get<Node[]>(url).pipe(
            map((respuesta: Node[]) => {
                if (convertirAJerarquia) {
                    return this.buildTree(respuesta);
                }
                return respuesta;
            })
        );
    }

    /**
     * Convierte un arreglo plano de nodos a una estructura jerárquica (árbol).
     * @param planos Arreglo plano recibido desde el API
     * @returns Arreglo jerárquico de nodos
     */
    private buildTree(items: Node[]): Node[] {
        const result: Node[] = [];

        // Agrupar por secuencia
        const groupedBySeq: { [seq: number]: Node[] } = {};
        for (const item of items) {
            if (!groupedBySeq[item.Seq]) groupedBySeq[item.Seq] = [];
            groupedBySeq[item.Seq].push({ ...item, children: [] });
        }

        // Procesar cada grupo (cada árbol independiente)
        for (const seq in groupedBySeq) {
            const nodes = groupedBySeq[seq];
            // Ordenar por Nivel ascendente
            nodes.sort((a, b) => (a.Nivel ?? 0) - (b.Nivel ?? 0));

            const levelMap = new Map<number, Node[]>(); // Nivel => nodos

            for (const node of nodes) {
                if (!levelMap.has(node.Nivel)) levelMap.set(node.Nivel, []);
                levelMap.get(node.Nivel)!.push(node);

                // Si no es raíz (Nivel > 1), intentar anidarlo al último nodo de Nivel - 1
                const parentLevel = node.Nivel - 1;
                const possibleParents = levelMap.get(parentLevel);
                if (possibleParents && possibleParents.length > 0) {
                    const lastParent = possibleParents[possibleParents.length - 1];
                    lastParent.children!.push(node);
                }
            }

            // Raíz = todos los de Nivel 1
            if (levelMap.get(1)) {
                result.push(...levelMap.get(1)!);
            }
        }

        return result;
    }
}