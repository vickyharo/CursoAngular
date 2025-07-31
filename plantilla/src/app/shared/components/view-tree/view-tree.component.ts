import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Node } from '../../../core/models/view-tree.model';

@Component({
    selector: 'view-tree',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-tree.component.html'
})
export class ViewTreeComponent {
    @Input() nodes: Node[] = [];
    @Output() nodeSelected = new EventEmitter<Node>();
    @Output() nodesChanged = new EventEmitter<Node[]>();

    selectedNode: Node | null = null;
    nodoCopiado: Node | null = null;

    seleccionarNodo(nodo: Node): void {
        this.selectedNode = nodo;
        this.nodeSelected.emit(nodo);
    }

    toggle(nodo: Node): void {
        nodo.expanded = !nodo.expanded;
    }

    agregarNodo(): void {
        if (!this.selectedNode) return;

        const nuevoNodo: Node = {
            CodigoRetorno: 0,
            DescripcionRetorno: '',
            IdRegimen: this.selectedNode.IdRegimen,
            Fideicomiso: this.selectedNode.Fideicomiso,
            IdPadre: this.selectedNode.IdAdmonInmueble,
            IdAdmonInmueble: Math.floor(Math.random() * 100000),
            Superficie: 0,
            Publico: 0,
            MetrosVendibles: 0,
            Utilizados: 0,
            Disponibles: 0,
            Nivel: this.selectedNode.Nivel + 1,
            Seq: (this.selectedNode.children?.length || 0) + 1,
            Descripcion: 'Nuevo Nodo',
            children: [],
            expanded: false
        };

        this.selectedNode.children = this.selectedNode.children || [];
        this.selectedNode.children.push(nuevoNodo);
        this.selectedNode.expanded = true;

        this.nodesChanged.emit(this.nodes);
    }

    copiarNodo(): void {
        if (!this.selectedNode) return;
        this.nodoCopiado = structuredClone(this.selectedNode);
        this.nodoCopiado.IdAdmonInmueble = Math.floor(Math.random() * 100000);
        this.nodoCopiado.Descripcion += ' (Copia)';
    }

    pegarNodo(): void {
        if (!this.selectedNode || !this.nodoCopiado) return;

        const nodoPegar = structuredClone(this.nodoCopiado);
        nodoPegar.IdAdmonInmueble = Math.floor(Math.random() * 100000);
        nodoPegar.IdPadre = this.selectedNode.IdAdmonInmueble;

        this.selectedNode.children = this.selectedNode.children || [];
        this.selectedNode.children.push(nodoPegar);
        this.selectedNode.expanded = true;

        this.nodesChanged.emit(this.nodes);
    }

    borrarNodo(): void {
        if (!this.selectedNode) return;

        this.eliminarNodo(this.nodes, this.selectedNode);
        this.selectedNode = null;

        this.nodesChanged.emit(this.nodes);
    }

    private eliminarNodo(lista: Node[], nodoAEliminar: Node): void {
        const index = lista.indexOf(nodoAEliminar);
        if (index !== -1) {
            lista.splice(index, 1);
            return;
        }
        for (const nodo of lista) {
            if (nodo.children && nodo.children.length > 0) {
                this.eliminarNodo(nodo.children, nodoAEliminar);
            }
        }
    }

    moverNodoArriba(): void {
        if (!this.selectedNode) return;

        const padre = this.encontrarPadre(this.nodes, this.selectedNode);
        const lista = padre ? padre.children! : this.nodes;
        const index = lista.indexOf(this.selectedNode);

        if (index > 0) {
            [lista[index - 1], lista[index]] = [lista[index], lista[index - 1]];
            this.nodesChanged.emit(this.nodes);
        }
    }

    moverNodoAbajo(): void {
        if (!this.selectedNode) return;

        const padre = this.encontrarPadre(this.nodes, this.selectedNode);
        const lista = padre ? padre.children! : this.nodes;
        const index = lista.indexOf(this.selectedNode);

        if (index < lista.length - 1) {
            [lista[index + 1], lista[index]] = [lista[index], lista[index + 1]];
            this.nodesChanged.emit(this.nodes);
        }
    }

    private encontrarPadre(lista: Node[], nodoBuscado: Node): Node | null {
        for (const nodo of lista) {
            if (nodo.children?.includes(nodoBuscado)) {
                return nodo;
            }
            if (nodo.children) {
                const encontrado = this.encontrarPadre(nodo.children, nodoBuscado);
                if (encontrado) return encontrado;
            }
        }
        return null;
    }
}
